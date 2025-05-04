import { BrowserHelper } from "@helpers/browser/browser.helper";
import { BasePage } from "../../pages/index.pages";

export interface IBaseServiceArgs {
  browserHelper: BrowserHelper;
  page: BasePage;
}
