import { MainPage } from "./main.page";
import { BaseService } from "@shared-web/services/base/base.service";
import { IMainActionsArgs } from "./main.types";
import { CookiePage } from "../cookie/cookie.page";
import { ClassLog } from "../../../../decorators/logger.decorators";

@ClassLog
export class MainService extends BaseService {
  protected override page: MainPage = null;
  protected cookiePo: CookiePage = null;

  constructor(args: IMainActionsArgs) {
    const { page, cookiePo } = args;
    super(args);
    this.page = page;
    this.cookiePo = cookiePo;
  }

  async navigateToSearch(): Promise<void> {
    await this.page.searchButton.click();
  }

  async navigateToSignIn(): Promise<void> {
    await this.page.signInButton.click();
  }

  async acceptCookie(): Promise<void> {
    await this.cookiePo.acceptCookieButton.click();
  }

  async rejectCookie(): Promise<void> {
    await this.cookiePo.rejectCookieButton.click();
  }
}
