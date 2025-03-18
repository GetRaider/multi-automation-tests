import { SearchPage } from "./search.page";
import { IBaseServiceArgs } from "@shared-web/services/base/base.service.types";

export interface ISearchServiceArgs extends IBaseServiceArgs {
  page: SearchPage;
}
