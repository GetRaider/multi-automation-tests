import { BrowserHelper } from "@helpers/browser/browser.helper";
import { envHelper } from "@helpers/env/env.helper";
import { BasePage } from "../../pages/index.pages";
import { IBaseServiceArgs } from "@shared-web/services/index.services";

export class BaseService {
  protected browserHelper: BrowserHelper = null;
  protected page: BasePage = null;

  constructor(args: IBaseServiceArgs) {
    const { browserHelper } = args;
    this.browserHelper = browserHelper;
  }

  async navigateToApp(): Promise<void> {
    return this.browserHelper.openUrl(envHelper.getBaseWebUrl());
  }
}
