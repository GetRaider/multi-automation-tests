import { SportPage } from "./sport.page";
import { IBaseServiceArgs } from "@shared-web/services/base/base.service.types";

export interface ISportServiceArgs extends IBaseServiceArgs {
  page: SportPage;
}
