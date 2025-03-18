import { BrowserContext, Page } from "@playwright/test";

import {
  AttachUniqueInReportArgs,
  IAddCookie,
  IAttachInReportArgs,
  IBrowserArgs,
  IScrollBy,
  ISetLocalStorage,
} from "./browser.helper.types";
import { primitiveHelper } from "../primitive/primitive.helper";
import { test } from "@fixtures/common.fixture";

export class BrowserHelper {
  public pwPage: Page = null;
  public context: BrowserContext = null;

  private _consoleErrors: string[] = [];
  private _pageErrors: string[] = [];

  constructor(args: IBrowserArgs) {
    const { pwPage, pwContext } = args;
    this.pwPage = pwPage;
    this.context = pwContext;
  }

  get consoleErrors(): string[] {
    return this._consoleErrors;
  }

  get pageErrors(): string[] {
    return this._pageErrors;
  }

  async openUrl(url: string): Promise<void> {
    await this.pwPage.goto(url);
  }

  async setLocalStorage(params: ISetLocalStorage): Promise<void> {
    await this.pwPage.addInitScript(_params => {
      const { key, value } = _params;
      window.localStorage.setItem(key, value);
    }, params);
  }

  async addCookies(params: IAddCookie[]): Promise<void> {
    await this.context.addCookies(params);
  }

  async scrollBy(params: IScrollBy): Promise<void> {
    const { x, y } = params;
    await this.pwPage.mouse.wheel(x, y);
  }

  async getPageTitle(): Promise<string> {
    return this.pwPage.title();
  }

  async pause(): Promise<void> {
    return this.pwPage.pause();
  }

  async refresh(): Promise<void> {
    await this.pwPage.reload();
  }

  async execute<R>(
    callback: (args?: unknown[]) => Promise<R>,
    args: unknown[] = [],
  ): Promise<R> {
    return this.pwPage.evaluate(callback, args);
  }

  async readFromClipboard(): Promise<string> {
    return this.execute(() => navigator.clipboard.readText());
  }

  hasConsoleErrorsMatchingText(text: string): boolean {
    return this.consoleErrors.some(error => error.includes(text));
  }

  async collectErrors(): Promise<void> {
    this.pwPage.on("console", message => {
      if (message.type() === "error") {
        this._consoleErrors.push(message.text());
      }
    });
    this.pwPage.on("pageerror", exception => {
      this._pageErrors.push(exception.message);
    });
  }

  async attachInReport(args: IAttachInReportArgs): Promise<void> {
    const { name, body, contentType = "text/plain" } = args;
    return test.info().attach(name, {
      contentType,
      body,
    });
  }

  async attachErrors(): Promise<void> {
    await this.attachConsoleErrorLogs();
    await this.attachPageErrors();
  }

  private async attachConsoleErrorLogs(): Promise<void> {
    const name = `console-error-${primitiveHelper.getCurrenTime()}`;
    this.pwPage.on("console", async message => {
      if (message.type() === "error") {
        const logMessageBuffer = Buffer.from(message.text());
        test.info().attachments.length
          ? await this.attachUniqueInReport({ name, body: logMessageBuffer })
          : await this.attachInReport({ name, body: logMessageBuffer });
      }
    });
  }

  private async attachPageErrors(): Promise<void> {
    const name = `page-errors-${primitiveHelper.getCurrenTime()}`;
    this.pwPage.on("pageerror", async error => {
      const errorMessageBuffer = Buffer.from(error.message);
      test.info().attachments.length
        ? await this.attachUniqueInReport({ name, body: errorMessageBuffer })
        : await this.attachInReport({ name, body: errorMessageBuffer });
    });
  }

  private async attachUniqueInReport(
    args: AttachUniqueInReportArgs,
  ): Promise<void> {
    const { name, body } = args;
    for (const attachment of test.info().attachments) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (!attachment?.body.equals(body)) {
        await this.attachInReport({ name, body });
      }
    }
  }
}
