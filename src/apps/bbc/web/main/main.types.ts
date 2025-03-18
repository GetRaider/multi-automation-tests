import { MainPage } from "./main.page";
import { CookiePage } from "../cookie/cookie.page";
import { IBaseServiceArgs } from "@shared-web/services/base/base.service.types";

export interface IMainActionsArgs extends IBaseServiceArgs {
  page: MainPage;
  cookiePo: CookiePage;
}
