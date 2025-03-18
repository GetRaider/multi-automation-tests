import {
  IRetryOptions,
  ISleepOptions,
  IWaitOptions,
} from "./waiters.helper.types";
import { timeouts } from "@constants/timeouts.constants";
import { loggerHelper } from "../logger/logger.helper";

const logger = loggerHelper.get("WaiterHelper");

export const waiterHelper = {
  sleep(timeout: number, options: ISleepOptions = {}): Promise<void> {
    const { sleepReason, ignoreReason = false } = options;
    ignoreReason ||
      logger.warn(
        `Sleeping ${timeout / 1000} seconds${
          sleepReason ? ` due to: ${sleepReason}` : ""
        }`,
      );
    return new Promise(resolve => setTimeout(resolve, timeout));
  },

  waitForAnimation(): Promise<void> {
    return this.sleep(timeouts.animation, { ignoreReason: true });
  },

  async retry<T>(
    callback: () => Promise<T>,
    retryCount: number,
    options: IRetryOptions = {},
  ): Promise<T> {
    const {
      interval = timeouts.xxxs,
      throwError = true,
      resolveWhenNoException = false,
      continueWithException = resolveWhenNoException,
      errorMessage,
    } = options;
    let caughtError: Error = null;
    do {
      try {
        const result = await callback();
        if (resolveWhenNoException || result) {
          return result;
        }
      } catch (err) {
        caughtError = err;
        if (!continueWithException) {
          break;
        }
      }
      await this.logErrorAndSleep(errorMessage, caughtError, interval);
    } while (retryCount--);
    throwError && logRetryFailedAndThrow(errorMessage, caughtError);
    logger.warn(
      `${errorMessage}${caughtError ? `:${caughtError.message}` : ""}`,
    );
  },

  async wait(
    callback: () => Promise<boolean>,
    timeout: number,
    { interval = 100, errorMessage, throwError = true }: IWaitOptions = {},
  ): Promise<boolean> {
    const startTime = Date.now();
    while (hasTime(startTime, timeout)) {
      try {
        const result = await callback();
        if (result) {
          return result;
        }
        errorMessage && logger.warn(errorMessage);
        await this.sleep(interval, { ignoreReason: true });
      } catch (error) {
        if (throwError) {
          errorMessage && logger.error(errorMessage);
          throw new Error(error);
        }
        errorMessage && logger.warn(errorMessage);
        return false;
      }
    }
    if (throwError) {
      errorMessage && logger.error(errorMessage);
      throw new Error(`Wait timeout has reached with ${timeout} timeout`);
    }
  },

  async logErrorAndSleep(
    errorMessage: string,
    err: Error,
    interval: number,
  ): Promise<void> {
    if (err || errorMessage) {
      logger.warn(`${errorMessage}${err ? `:${err.message}` : ""}`);
    }
    logger.warn(`Retrying...`);
    await this.sleep(interval, { ignoreReason: true });
  },
};

function hasTime(startTime: number, timeout: number): boolean {
  return Date.now() < startTime + timeout;
}

function logRetryFailedAndThrow(
  errorMessage: string,
  caughtError: Error,
): never {
  const message = `Retry failed: ${errorMessage}
      ${caughtError.message || ""}`;
  logger.error(message);
  throw new Error(message);
}
