import { envHelper } from "@helpers/env/env.helper";
import { urlHelper } from "@helpers/url/url.helper";
import { IGenericHttpResponse, IMainApiRequestArgs } from "../http/http.types";
import { HttpClient } from "../http/http-client";

export class BaseController {
  protected readonly baseUrl = envHelper.getBaseApiUrl();

  protected constructor(protected baseHttp: HttpClient) {}

  protected async get<T>(
    args: IMainApiRequestArgs,
  ): Promise<IGenericHttpResponse<T>> {
    const { token, headers, pathParams, queries, timeout } = args;
    return this.baseHttp.get({
      url: this.getUrl(pathParams, queries),
      headers: this.getHeaders(token, headers),
      timeout,
    });
  }

  protected async post<T>(
    args: IMainApiRequestArgs,
  ): Promise<IGenericHttpResponse<T>> {
    const { token = null, headers, body, pathParams, queries, timeout } = args;
    return this.baseHttp.post({
      url: this.getUrl(pathParams, queries),
      headers: this.getHeaders(token, headers),
      body,
      timeout,
    });
  }

  protected async put<T>(
    args: IMainApiRequestArgs,
  ): Promise<IGenericHttpResponse<T>> {
    const { token = null, headers, body, pathParams, queries, timeout } = args;
    return this.baseHttp.put({
      url: this.getUrl(pathParams, queries),
      headers: this.getHeaders(token, headers),
      body,
      timeout,
    });
  }

  protected async patch<T>(
    args: IMainApiRequestArgs,
  ): Promise<IGenericHttpResponse<T>> {
    const {
      token = null,
      headers = { token },
      body,
      pathParams,
      queries,
      timeout,
    } = args;
    return this.baseHttp.patch({
      url: this.getUrl(pathParams, queries),
      headers: this.getHeaders(token, headers),
      body,
      timeout,
    });
  }

  protected async delete<T>(
    args: IMainApiRequestArgs,
  ): Promise<IGenericHttpResponse<T>> {
    const { token = null, headers, body, pathParams, queries, timeout } = args;
    return this.baseHttp.delete({
      url: this.getUrl(pathParams, queries),
      headers: this.getHeaders(token, headers),
      body,
      timeout,
    });
  }

  private getUrl(
    pathParams: string[],
    queries: Record<string, string>,
  ): string {
    return urlHelper.construct(
      {
        base: this.baseUrl,
        params: pathParams,
        queries: queries,
      },
      { shouldSkipMissingArgs: true },
    );
  }

  private getHeaders(token: string, headers: Record<string, string>) {
    return { authorization: token, ...headers };
  }
}
