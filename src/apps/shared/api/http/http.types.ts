import { Serializable } from "playwright-core/types/structs";

export interface IBaseApiRequestArgs {
  url: string;
  headers?: Record<string, string>;
  body?: string | Buffer | Serializable;
  timeout?: number;
}

export interface IGenericHttpResponse<T> {
  data: T;
  headers: Record<string, string>;
  status: number;
}

export interface IMainApiRequestArgs {
  token?: string;
  headers?: Record<string, string>;
  body?: unknown;
  pathParams?: string[];
  queries?: Record<string, string>;
  timeout?: number;
}

export interface IGetRequestError {
  request: unknown;
  error: unknown;
}

export enum ContentType {
  csv = "text/csv",
  png = "image/png",
  json = "application/json",
  multipartFormData = "multipart/form-data",
}

export interface IUserCredentials {
  login: string;
  password: string;
}

export enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}
