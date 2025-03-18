import { BrowserHelper } from "@helpers/browser/browser.helper";
import { HttpClient } from "@shared-api/http/http-client";
import { MainService } from "../apps/bbc/web/main/main.service";
import { SearchService } from "../apps/bbc/web/search/search.service";
import { SignInService } from "../apps/bbc/web/sign-in/sign-in.service";
import { SportService } from "../apps/bbc/web/sport/sport.service";
import { TodoController } from "../apps/typicode/api/todo/todo.controller";
import { AuthController } from "@shared-api/controllers/auth/auth.controller";

export interface IFixtures {
  web: IWeb;
  api: IApi;
}

export interface IWeb {
  app: WebApps;
  browser: BrowserHelper;
}

export interface IApi {
  app: ApiApps;
  http: HttpClient;
}

export type WebApps = {
  bbc: {
    main: MainService;
    search: SearchService;
    signIn: SignInService;
    sport: SportService;
  };
};

export type ApiApps = {
  typicode: {
    todo: TodoController;
    auth: AuthController;
  };
};
