import {
  BaseController,
  HttpClient,
  IGenericHttpResponse,
} from "@shared-api/index.api";

import { ITodo } from "./todo.controller.types";
import { ClassLog } from "../../../../decorators/logger.decorators";

@ClassLog
export class TodoController extends BaseController {
  private readonly relativeUrl = "todos";

  constructor(protected override baseHttp: HttpClient) {
    super(baseHttp);
  }

  async getAll(): Promise<IGenericHttpResponse<ITodo[]>> {
    return this.get<ITodo[]>({
      pathParams: [this.relativeUrl],
    });
  }

  // Just a demo of getTokenByAuthOption usage, title has to be changed
  // async getAllWithAuth(
  //   authOption: AuthOptionType,
  // ): Promise<IGenericHttpResponse<ITodo[]>> {
  //   return this.get<ITodo[]>({
  //     pathParams: [this.relativeUrl],
  //     token: await externalApi.auth.getTokenByAuthOption(authOption),
  //   });
  // }
}
