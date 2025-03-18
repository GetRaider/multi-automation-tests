import { SignInPage } from "./sign-in.page";
import { IBaseServiceArgs } from "@shared-web/services/base/base.service.types";

export interface ISignInServiceArgs extends IBaseServiceArgs {
  page: SignInPage;
}
