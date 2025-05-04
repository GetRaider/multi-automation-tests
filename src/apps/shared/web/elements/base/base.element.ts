import { Locator } from "@playwright/test";

import { loggerHelper } from "@helpers/logger/logger.helper";
import { waiterHelper } from "@helpers/waiter/waiter.helper";
import { timeouts } from "@constants/timeouts.constants";
import {
  IClickParams,
  IGetTextParams,
  IGetValueParams,
  IHoverParams,
  IWaitUntilDisplayed,
} from "@shared-web/elements/base/base.element.types";

const logger = loggerHelper.get("BaseElementPe");

export abstract class BaseElement {
  protected constructor(protected element: Locator) {}

  protected async getLocator(): Promise<Locator> {
    return this.element;
  }

  async isDisplayed(): Promise<boolean> {
    return await this.element.isVisible();
  }

  async isEnabled({
    timeout = timeouts.action,
    throwError = true,
  }: IGetTextParams = {}): Promise<boolean> {
    try {
      return await this.element.isEnabled({ timeout });
    } catch (error) {
      const errorMessage = `Can't check for enabled on '${await this.getLocator()}' element.\nDetails: ${
        error.message
      }`;
      logger.error(errorMessage);
      if (throwError) throw new Error(errorMessage);
    }
  }

  async click({
    timeout = timeouts.action,
    throwError = true,
  }: IClickParams = {}): Promise<void> {
    try {
      if (await this.isEnabled()) {
        await this.element.click({ timeout });
      } else {
        logger.warn(
          `Element with '${this.getLocator}' is disabled - force clicking...`,
        );
        await this.element.click({ force: true, timeout });
      }
    } catch (error) {
      const errorMessage = `Can't click on '${await this.getLocator()}' element.\nDetails: ${
        error.message
      }`;
      if (throwError) throw new Error(errorMessage);
      logger.error(errorMessage);
    }
  }

  async getText({
    timeout = timeouts.action,
    throwError = true,
  }: IGetValueParams = {}): Promise<string> {
    try {
      return await this.element.textContent({ timeout });
    } catch (error) {
      const errorMessage = `Can't get text on '${await this.getLocator()} element'.\nDetails: ${
        error.message
      }`;
      logger.error(errorMessage);
      if (throwError) throw new Error(errorMessage);
    }
  }

  async getValue({
    timeout = timeouts.action,
    throwError = true,
  }: IGetValueParams = {}): Promise<string> {
    try {
      return await this.element.inputValue({ timeout });
    } catch (error) {
      const errorMessage = `Can't get value on '${await this.getLocator()} element'.\nDetails: ${
        error.message
      }`;
      logger.error(errorMessage);
      if (throwError) throw new Error(errorMessage);
    }
  }

  async hover({
    throwError = true,
    timeout,
  }: IHoverParams = {}): Promise<void> {
    try {
      return await this.element.hover({ timeout });
    } catch (error) {
      const errorMessage = `Can't hover on '${await this.getLocator()}' element.\nDetails: ${
        error.message
      }`;
      logger.error(errorMessage);
      if (throwError) throw new Error(errorMessage);
    }
  }

  async waitUntilDisplayed(
    timeout: number,
    {
      throwError = true,
      errorMessage = "Failed to wait for element to display",
    }: IWaitUntilDisplayed = {},
  ): Promise<boolean> {
    try {
      await this.element.waitFor({ timeout, state: "visible" });
      return true;
    } catch (error) {
      logger.warn(`${errorMessage}: ${await this.getLocator()}`);
      if (throwError) {
        throw { ...error, message: `${errorMessage}: ${error.message}}` };
      }
      return false;
    }
  }

  async waitUntilDisappeared(
    timeout: number,
    {
      throwError = true,
      errorMessage = "Failed to wait for element to disappear",
    }: IWaitUntilDisplayed = {},
  ): Promise<boolean> {
    try {
      await this.element.waitFor({ timeout, state: "hidden" });
      return true;
    } catch (error) {
      console.error(`${errorMessage}: ${await this.getLocator()}`);
      if (throwError) {
        throw { ...error, message: `${errorMessage}: ${error.message}}` };
      }
      return false;
    }
  }

  async waitUntilExist(
    timeout: number,
    {
      throwError = true,
      errorMessage = "Failed to wait for element to exist",
    }: IWaitUntilDisplayed = {},
  ): Promise<boolean> {
    try {
      await this.element.waitFor({ timeout, state: "attached" });
      return true;
    } catch (error) {
      logger.error(`${errorMessage}: ${await this.getLocator()}`);
      if (throwError) {
        throw { ...error, message: `${errorMessage}: ${error.message}}` };
      }
      return false;
    }
  }

  async waitUntilEnabled(
    timeout: number,
    {
      throwError = true,
      errorMessage = "Failed to wait for element to be enabled",
    }: IWaitUntilDisplayed = {},
  ): Promise<boolean> {
    try {
      return await waiterHelper.wait(async () => this.isEnabled(), timeout);
    } catch (error) {
      logger.warn(`${errorMessage}: ${await this.getLocator()}`);
      if (throwError) {
        throw { ...error, message: `${errorMessage}: ${error.message}}` };
      }
      return false;
    }
  }
}
