import { Locator } from "@playwright/test";

import { BaseElement } from "../index.elements";
import { loggerHelper } from "@helpers/index.helpers";

const log = loggerHelper.get("InputElement");

export class InputElement extends BaseElement {
  constructor(protected override element: Locator) {
    super(element);
  }

  async fill(
    text: string,
    { timeout, throwError = true }: IFillParams = {},
  ): Promise<void> {
    try {
      return await this.element.fill(text, { timeout });
    } catch (error) {
      const errorMessage = `Can't fill '${await this.getLocator()}' input.\nDetails: ${
        error.message
      }`;
      log.error(errorMessage);
      if (throwError) throw new Error(errorMessage);
    }
  }
}

interface IFillParams {
  timeout?: number;
  throwError?: boolean;
}
