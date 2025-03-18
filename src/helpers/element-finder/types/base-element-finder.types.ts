import { IElementSearchOptions, IPartial } from "./index.types";

export interface IBaseElementFinder<T> {
  testId: (
    testId: string,
    options?: Record<string, unknown>,
    esOptions?: IElementSearchOptions,
  ) => T;
  role: (
    role: string,
    options?: Record<string, unknown>,
    esOptions?: IElementSearchOptions,
  ) => T;
  text: (
    text: string,
    options?: Record<string, unknown>,
    esOptions?: IElementSearchOptions,
  ) => T;
  title: (
    title: string,
    options?: Record<string, unknown>,
    esOptions?: IElementSearchOptions,
  ) => T;
  altText: (
    altText: string,
    options?: Record<string, unknown>,
    esOptions?: IElementSearchOptions,
  ) => T;
  label: (
    label: string,
    options?: Record<string, unknown>,
    esOptions?: IElementSearchOptions,
  ) => T;
  placeholder: (
    placeholder: string,
    options?: Record<string, unknown>,
    esOptions?: IElementSearchOptions,
  ) => T;
  className: (
    className: string,
    options?: Record<string, unknown>,
    esOptions?: IElementSearchOptions,
  ) => T;
  id: (
    id: string,
    options?: Record<string, unknown>,
    esOptions?: IElementSearchOptions,
  ) => T;
}

export interface IGetLocatorArgs extends IPartial {
  name: string;
  value: string;
}

export enum PwMethodName {
  getByTestId = "getByTestId",
  getByRole = "getByRole",
  getByText = "getByText",
  getByTitle = "getByTitle",
  getByLabel = "getByLabel",
  getByPlaceholder = "getByPlaceholder",
  getByAltText = "getByAltText",
  locator = "locator",
}

export enum Attribute {
  className = "className",
  id = "id",
}

export interface IConstructCustomLocatorParams {
  attribute: Attribute;
  value: string;
  partial: boolean;
}
