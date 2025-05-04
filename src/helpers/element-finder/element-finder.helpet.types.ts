import { Page } from "@playwright/test";

export enum ElementAttribute {
  className = "class",
  id = "id",
  testId = "data-testid",
  role = "role",
  title = "title",
  name = "name",
}

export enum ElementTag {
  label = "label",
  div = "div",
  button = "button",
  input = "input",
  textarea = "textarea",
  iframe = "iframe",
  class = "class",
}

export interface IPwFinderOpts {
  exact?: boolean;
}

export interface IBuildLocatorParams extends IPwFinderOpts {
  attributeName: ElementAttribute;
  attributeValue: string;
  followBy?: ElementTag;
}

export interface ICustomFinderOpts extends IPwFinderOpts {
  followBy?: ElementTag;
}

export type AttributeRoles = Parameters<Page["getByRole"]>[0];
