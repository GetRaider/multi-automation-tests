import { configure, getLogger } from "log4js";
import { test } from "@playwright/test";

import { IGetLogger, IGetSpecifiedArgs, LogType } from "./logger.helper.types";
import { magicStrings } from "@constants/magic-strings.constants";
import { processEnv } from "../processEnv/processEnv.helper";

class LoggerHelper {
  private readonly logLevel = processEnv.LOG_LEVEL || "ALL";

  constructor() {
    configure({
      appenders: {
        console: {
          layout: {
            pattern: "> %[%-5.5p [%d{hh:mm:ss:SSS}] {%c} %m%]",
            type: "pattern",
          },
          type: "console",
        },
        file: {
          filename: `${magicStrings.path.artifacts}/logs/${Date.now()}_${
            process.pid
          }.log`,
          layout: {
            pattern: "> %-5.5p [%d{hh.mm.ss.SSS}] {%c} %m",
            type: "pattern",
          },
          type: "file",
        },
      },
      categories: {
        default: { appenders: ["console", "file"], level: this.logLevel },
      },
    });
  }

  get(category: string): IGetLogger {
    const logger = getLogger(category);
    return {
      info: (message, params) =>
        this.getSpecifiedLog({
          logger,
          type: LogType.info,
          message,
          shouldAddReportStep: params?.shouldAddStep,
        }),
      warn: (message, params) =>
        this.getSpecifiedLog({
          logger,
          type: LogType.warn,
          message,
          shouldAddReportStep: params?.shouldAddStep,
        }),
      debug: (message, params) =>
        this.getSpecifiedLog({
          logger,
          type: LogType.debug,
          message,
          shouldAddReportStep: params?.shouldAddStep,
        }),
      error: (message, params) =>
        this.getSpecifiedLog({
          logger,
          type: LogType.error,
          message,
          shouldAddReportStep: params?.shouldAddStep,
        }),
      trace: (message, params) =>
        this.getSpecifiedLog({
          logger,
          type: LogType.trace,
          message,
          shouldAddReportStep: params?.shouldAddStep,
        }),
      fatal: (message, params) =>
        this.getSpecifiedLog({
          logger,
          type: LogType.fatal,
          message,
          shouldAddReportStep: params?.shouldAddStep,
        }),
    };
  }

  private getSpecifiedLog(args: IGetSpecifiedArgs): void {
    const { logger, type, message, shouldAddReportStep = false } = args;
    logger[type](message);
    shouldAddReportStep &&
      test.info().annotations.push({
        type: "Step",
        description: message,
      });
  }
}

export const loggerHelper = new LoggerHelper();
