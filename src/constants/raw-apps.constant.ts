import { MainService } from "../apps/bbc/web/main/main.service";
import { MainPage } from "../apps/bbc/web/main/main.page";
import { SearchService } from "../apps/bbc/web/search/search.service";
import { SearchPage } from "../apps/bbc/web/search/search.page";
import { SignInService } from "../apps/bbc/web/sign-in/sign-in.service";
import { SignInPage } from "../apps/bbc/web/sign-in/sign-in.page";
import { SportService } from "../apps/bbc/web/sport/sport.service";
import { SportPage } from "../apps/bbc/web/sport/sport.page";
import { TodoController } from "../apps/typicode/api/todo/todo.controller";
import { AuthController } from "@shared-api/controllers/auth/auth.controller";
import {
  AppRawControllers,
  AppRawServices,
} from "@helpers/assembler/assembler.helper.types";

export const appRawServices: AppRawServices = {
  bbc: {
    main: { service: MainService, pages: { page: MainPage } },
    search: { service: SearchService, pages: { page: SearchPage } },
    signIn: { service: SignInService, pages: { page: SignInPage } },
    sport: { service: SportService, pages: { page: SportPage } },
  },
  typicode: {},
};

export const appRawControllers: AppRawControllers = {
  bbc: {},
  typicode: {
    todo: TodoController,
    auth: AuthController,
  },
};
