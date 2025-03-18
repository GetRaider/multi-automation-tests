import { BrowserHelper } from "@helpers/browser/browser.helper";
import { ElementFinderHelper } from "@helpers/element-finder/element-finder.helper";
import { loggerHelper } from "@helpers/logger/logger.helper";
import { BaseService } from "@shared-web/services/base/base.service";
import { HttpClient } from "@shared-api/http/http-client";
import {
  appRawControllers,
  appRawServices,
} from "@constants/raw-apps.constant";
import { envHelper } from "@helpers/env/env.helper";
import { ApiApps, IApi, IWeb, WebApps } from "@fixtures/common.fixture.types";
import {
  App,
  AssemblerConstructor,
  IAssembleArgs,
  IAssembleServicePages,
  RawControllers,
  RawServices,
} from "@helpers/assembler/assembler.helper.types";

const logger = loggerHelper.get("AssemblerHelper");

export class AssemblerHelper {
  private readonly currentAppName = envHelper.getAppName();
  private readonly browserHelper: BrowserHelper = null;
  private readonly elementFinder: ElementFinderHelper = null;
  private readonly httpClient: HttpClient = null;

  constructor({
    browserHelper,
    elementFinder,
    httpClient,
  }: AssemblerConstructor) {
    this.browserHelper = browserHelper;
    this.elementFinder = elementFinder;
    this.httpClient = httpClient;
  }

  web(): IWeb {
    return {
      app: this.assembledAllServices(
        appRawServices[this.currentAppName],
        this.currentAppName,
      ),
      browser: this.browserHelper,
    };
  }

  private assembledAllServices(
    rawServices: RawServices,
    appName: App,
  ): WebApps {
    if (!rawServices) throw `No services provided for '${appName}' app`;
    const assembledServices = { [appName]: {} } as WebApps;
    Object.entries(rawServices).forEach(([name, serviceArgs]) => {
      assembledServices[appName][name] = this.assembleService(serviceArgs);
    });
    return assembledServices;
  }

  api(): IApi {
    return {
      app: this.assembledAllControllers(
        appRawControllers[this.currentAppName],
        this.currentAppName,
      ),
      http: this.httpClient,
    };
  }

  private assembledAllControllers(
    rawControllers: RawControllers,
    appName: App,
  ): ApiApps {
    if (!rawControllers) throw `No controllers provided for '${appName}' app`;
    const assembledControllers = { [appName]: {} } as ApiApps;
    Object.entries(rawControllers).forEach(
      ([name, controller]) =>
        (assembledControllers[appName][name] = new controller(this.httpClient)),
    );
    return assembledControllers;
  }

  private assembleService(args: IAssembleArgs): BaseService {
    const { service, pages, additionalServices = [] } = args;

    !this.arePagesExist(pages, service.name) && process.exit(13);

    return new service({
      ...this.assemblePages(pages),
      ...this.assembleAdditionalServices(additionalServices),
      browserHelper: this.browserHelper,
    });
  }

  private arePagesExist(
    pages: IAssembleServicePages,
    serviceName: string,
  ): boolean {
    if (!pages) {
      logger.fatal(`No pages provided for '${serviceName}'`);
      return false;
    }

    if (!pages.page) {
      logger.fatal(`No main page provided for '${serviceName}'`);
      return false;
    }

    return true;
  }

  private assemblePages(pages: IAssembleServicePages): Record<string, unknown> {
    const { page, additionalPages = [] } = pages;
    const assembledMainPage = new page(this.elementFinder);
    const assembledAdditionalPages = {};

    additionalPages.length &&
      additionalPages.forEach(
        page =>
          (assembledAdditionalPages[this.normalize.pageName(page.name)] =
            new page(this.elementFinder)),
      );

    return { page: assembledMainPage, ...assembledAdditionalPages };
  }

  private assembleAdditionalServices(
    additionalServices: IAssembleArgs[] = [],
  ): Record<string, IAssembleArgs> {
    const assembledAdditionalServices = {};

    additionalServices.length &&
      additionalServices.forEach(({ service, pages, additionalServices }) => {
        return (assembledAdditionalServices[
          this.normalize.serviceName(service.name)
        ] = this.assembleService({
          service,
          pages,
          additionalServices,
        }));
      });

    return assembledAdditionalServices;
  }

  private normalize = {
    pageName(name: string): string {
      const letters = name.split("");
      letters[0] = letters[0].toLowerCase();
      return letters.join(",").replaceAll(",", "");
    },

    serviceName(name: string): string {
      const letters = name.split("");
      letters[0] = letters[0].toLowerCase();
      return letters.join(",").replaceAll(",", "").replaceAll("Service", "");
    },
  };
}
