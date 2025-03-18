import { Page } from "@playwright/test";

import {
  IBaseElementFinderArgs,
  IElementSearchOptions,
} from "./types/index.types";
import {
  Attribute,
  IConstructCustomLocatorParams,
  PwMethodName,
} from "@helpers/element-finder/types/base-element-finder.types";
import { IPwSearchArgs } from "@helpers/element-finder/types/element-finder.types";

export interface IBasePwElementFinderHelper<T> {
  role: (
    role: string,
    options?: Record<string, unknown>,
    esOptions?: IElementSearchOptions,
  ) => T;
  text: (
    role: string,
    options?: Record<string, unknown>,
    esOptions?: IElementSearchOptions,
  ) => T;
}

export abstract class BaseElementFinderHelper<T>
  implements IBasePwElementFinderHelper<T>
{
  protected page: Page = null;

  protected constructor(params: IBaseElementFinderArgs) {
    const { pwPage } = params;
    this.page = pwPage;
  }

  protected abstract search(args: IPwSearchArgs): T;

  testId(
    testId: string,
    options?: Record<string, unknown>,
    esOptions?: IElementSearchOptions,
  ): T {
    return this.search({
      pwMethod: {
        name: PwMethodName.getByTestId,
        args: [testId, options],
      },
      esOptions,
    });
  }

  role(
    role: string,
    options?: Record<string, unknown>,
    esOptions?: IElementSearchOptions,
  ): T {
    return this.search({
      pwMethod: { name: PwMethodName.getByRole, args: [role, options] },
      esOptions,
    });
  }

  text(
    text: string,
    options?: Record<string, unknown>,
    esOptions?: IElementSearchOptions,
  ): T {
    return this.search({
      pwMethod: { name: PwMethodName.getByText, args: [text, options] },
      esOptions,
    });
  }

  title(
    title: string,
    options?: Record<string, unknown>,
    esOptions?: IElementSearchOptions,
  ): T {
    return this.search({
      pwMethod: { name: PwMethodName.getByTitle, args: [title, options] },
      esOptions,
    });
  }

  altText(
    altText: string,
    options?: Record<string, unknown>,
    esOptions?: IElementSearchOptions,
  ): T {
    return this.search({
      pwMethod: { name: PwMethodName.getByAltText, args: [altText, options] },
      esOptions,
    });
  }

  label(
    label: string,
    options?: Record<string, unknown>,
    esOptions?: IElementSearchOptions,
  ): T {
    return this.search({
      pwMethod: { name: PwMethodName.getByLabel, args: [label, options] },
      esOptions,
    });
  }

  placeholder(
    placeholder: string,
    options?: Record<string, unknown>,
    esOptions?: IElementSearchOptions,
  ): T {
    return this.search({
      pwMethod: {
        name: PwMethodName.getByPlaceholder,
        args: [placeholder, options],
      },
      esOptions,
    });
  }

  className(
    className: string,
    options?: Record<string, unknown>,
    esOptions?: IElementSearchOptions,
  ): T {
    return this.search({
      pwMethod: {
        name: PwMethodName.locator,
        args: [
          this.constructCustomLocator({
            attribute: Attribute.className,
            value: className,
            partial: esOptions?.partial,
          }),
          options,
        ],
      },
      esOptions,
    });
  }

  id(
    id: string,
    options?: Record<string, unknown>,
    esOptions?: IElementSearchOptions,
  ): T {
    return this.search({
      pwMethod: {
        name: PwMethodName.locator,
        args: [
          this.constructCustomLocator({
            attribute: Attribute.id,
            value: id,
            partial: esOptions?.partial,
          }),
          options,
        ],
      },
      esOptions,
    });
  }

  private constructCustomLocator({
    partial,
    value,
    attribute,
  }: IConstructCustomLocatorParams): string {
    return `[${attribute}${partial ? "*" : ""}='${value}']`;
  }
}
