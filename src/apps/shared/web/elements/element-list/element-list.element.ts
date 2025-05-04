import { Locator } from "@playwright/test";
import _ from "lodash";

import { BaseElement, Constructable } from "../index.elements";

export class ElementsList<T extends BaseElement> {
  constructor(
    protected DesiredComponent: Constructable<T>,
    private element: Locator,
  ) {}

  async getElementByIndex(index: number): Promise<T> {
    return new this.DesiredComponent(await this.resolveAllElements()[index]);
  }

  async getLength(): Promise<number> {
    return (await this.resolveAllElements()).length;
  }

  async getAllElements(): Promise<T[]> {
    const allElements = await this.element.all();
    return _.times(allElements.length).map(
      index => new this.DesiredComponent(allElements[index]),
    );
  }

  private async resolveAllElements(): Promise<Locator[]> {
    return this.element.all();
  }
}
