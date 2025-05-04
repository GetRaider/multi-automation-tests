import { Locator, Page } from "@playwright/test";

import {
  AttributeRoles,
  ElementAttribute,
  IBuildLocatorParams,
  ICustomFinderOpts,
  IPwFinderOpts,
} from "./element-finder.helpet.types";

export class ElementFinderHelper {
  constructor(protected readonly pwPage: Page) {}

  text(text: string | RegExp, options: IPwFinderOpts = {}): Locator {
    return this.pwPage.getByText(text, options);
  }

  altText(text: string, options: IPwFinderOpts = {}): Locator {
    return this.pwPage.getByAltText(text, options);
  }

  title(text: string, options: IPwFinderOpts = {}): Locator {
    return this.pwPage.getByTitle(text, options);
  }

  label(text: string, options: IPwFinderOpts = {}): Locator {
    return this.pwPage.getByLabel(text, options);
  }

  role(role: AttributeRoles, options: IPwFinderOpts = {}): Locator {
    return this.pwPage.getByRole(role, options);
  }

  custom(params: IBuildLocatorParams): Locator {
    return this.pwPage.locator(this.buildLocator(params));
  }

  testId(
    testId: string,
    { exact = true, followBy }: ICustomFinderOpts = {},
  ): Locator {
    return exact
      ? this.pwPage.getByTestId(testId)
      : this.custom({
          attributeName: ElementAttribute.testId,
          attributeValue: testId,
          exact,
          followBy,
        });
  }

  class(className: string, { exact, followBy }: ICustomFinderOpts = {}) {
    return this.custom({
      attributeName: ElementAttribute.className,
      attributeValue: className,
      exact,
      followBy,
    });
  }

  id(id: string, { exact, followBy }: ICustomFinderOpts = {}) {
    return this.custom({
      attributeName: ElementAttribute.id,
      attributeValue: id,
      exact,
      followBy,
    });
  }

  name(name: string, { exact, followBy }: ICustomFinderOpts = {}) {
    return this.custom({
      attributeName: ElementAttribute.name,
      attributeValue: name,
      exact,
      followBy,
    });
  }

  private buildLocator({
    attributeName,
    attributeValue,
    followBy: followingBy,
    exact = true,
  }: IBuildLocatorParams): string {
    const locatorParts: string[] = [];
    const operator = exact ? "=" : "*=";
    const attributeSelector = `[${attributeName}${operator}"${attributeValue}"]`;

    locatorParts.push(attributeSelector);
    if (followingBy) locatorParts.push(followingBy);
    return locatorParts.join(" ");
  }
}
