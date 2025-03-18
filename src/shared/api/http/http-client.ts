import { APIRequestContext } from "playwright-core";

import {
  IBaseApiRequestArgs,
  IGenericHttpResponse,
  Method,
} from "../index.api";
import { loggerHelper } from "@helpers/logger/logger.helper";

const logger = loggerHelper.get("Http-Client");

interface IHttpClient {
  get<T>(args: IBaseApiRequestArgs): Promise<IGenericHttpResponse<T>>;
  post<T>(args: IBaseApiRequestArgs): Promise<IGenericHttpResponse<T>>;
  put<T>(args: IBaseApiRequestArgs): Promise<IGenericHttpResponse<T>>;
  patch<T>(args: IBaseApiRequestArgs): Promise<IGenericHttpResponse<T>>;
  delete<T>(args: IBaseApiRequestArgs): Promise<IGenericHttpResponse<T>>;
}

export class HttpClient implements IHttpClient {
  constructor(
    private readonly apiModule: APIRequestContext | Promise<APIRequestContext>,
  ) {}

  async get<T>(args: IBaseApiRequestArgs): Promise<IGenericHttpResponse<T>> {
    return this.sendRequest<T>(Method.GET, args);
  }

  async post<T>(args: IBaseApiRequestArgs): Promise<IGenericHttpResponse<T>> {
    return this.sendRequest<T>(Method.POST, args);
  }

  async put<T>(args: IBaseApiRequestArgs): Promise<IGenericHttpResponse<T>> {
    return this.sendRequest<T>(Method.PUT, args);
  }

  async patch<T>(args: IBaseApiRequestArgs): Promise<IGenericHttpResponse<T>> {
    return this.sendRequest<T>(Method.PATCH, args);
  }

  async delete<T>(args: IBaseApiRequestArgs): Promise<IGenericHttpResponse<T>> {
    return this.sendRequest<T>(Method.DELETE, args);
  }

  private async sendRequest<T>(
    method: Method,
    args: IBaseApiRequestArgs,
  ): Promise<IGenericHttpResponse<T>> {
    const { url, headers, body, timeout = 0 } = args;
    const request = {
      method,
      headers,
      data: body,
      timeout,
    };
    try {
      const response =
        this.apiModule instanceof Promise
          ? await (await this.apiModule).fetch(url, request)
          : await this.apiModule.fetch(url, request);
      return {
        data: await response.json(),
        headers: response.headers(),
        status: response.status(),
      };
    } catch (error) {
      const errorMessage = `Failed to send request.\nRequest: ${request}\nError: ${error.message}`;
      logger.error(errorMessage);
      throw new Error(errorMessage);
    }
  }
}
