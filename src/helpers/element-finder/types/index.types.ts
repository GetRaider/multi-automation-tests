import { Locator, Page } from "@playwright/test";

export type ElementSearcher = IPwElementSearcher | IElementSearcher;

export interface IPwElementSearcher {
  findElement: FindElement;
  locator: string;
}

export interface IPwElementsSearcher {
  findElements: FindElements;
  getElementByIndex: (index: number) => {
    findElement: FindElement;
    locator: string;
  };
  locator: string;
}

export interface IElementSearcher {
  findElement: FindElement;
  locator: string;
}

export interface IElementsSearcher {
  findElements: () => Promise<Locator[]>;
  getElementByIndex: (index: number) => IElementSearcher;
}

export interface IPartial {
  partial?: boolean;
}

export interface IElementSearchOptions extends IPartial {
  takeFirstElement?: boolean;
  frameLocator?: string;
}

export interface IElementsSearchOptions extends IPartial {}

export type SearchOptions<T> = T extends IElementSearcher
  ? IElementSearchOptions
  : IElementsSearchOptions;

export type FindElement = () => Promise<Locator>;
export type FindElements = () => Promise<Locator[]>;

export interface IBaseElementFinderArgs {
  pwPage: Page;
}

export interface IElementFinderArgs<R> extends IBaseElementFinderArgs {
  searchRoot?: R;
}

export interface IElementsFinderArgs<R> extends IElementFinderArgs<R> {}

export interface IPwElementFinderArgs<R> extends IElementsFinderArgs<R> {}
