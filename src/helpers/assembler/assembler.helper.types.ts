import { Constructable } from "@shared-web/elements/element-list/element-list.element.types";
import { BasePage } from "@shared-web/pages/base/base.page";
import { BaseService } from "@shared-web/services/base/base.service";
import { BaseController } from "@shared-api/controllers/base.controller";
import { ElementFinderHelper } from "@helpers/element-finder/element-finder.helper";
import { BrowserHelper } from "@helpers/browser/browser.helper";
import { HttpClient } from "@shared-api/http/http-client";

export interface IAssembleServicePages {
  page: Constructable<BasePage>;
  additionalPages?: Constructable<BasePage>[];
}

export interface IAssembleArgs {
  service: Constructable<BaseService>;
  pages: IAssembleServicePages;
  additionalServices?: IAssembleArgs[];
}

export type AppRawServices = Record<App, RawServices>;
export type RawServices = Record<string, IRawService>;
export type RawControllers = Record<string, Constructable<BaseController>>;
export type AppRawControllers = Record<App, RawControllers>;

export interface IRawService {
  service: Constructable<BaseService>;
  pages: IAssembleServicePages;
  additionalServices?: IRawService[];
}

export enum App {
  bbc = "bbc",
  typicode = "typicode",
}

export interface IWebAssemblerConstructor {
  elementFinder: ElementFinderHelper;
  browserHelper: BrowserHelper;

  httpClient?: never;
}

export interface IApiAssemblerConstructor {
  httpClient: HttpClient;

  elementFinder?: never;
  browserHelper?: never;
}

export type AssemblerConstructor =
  | IWebAssemblerConstructor
  | IApiAssemblerConstructor;
