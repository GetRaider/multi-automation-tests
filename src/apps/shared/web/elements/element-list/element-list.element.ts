import { Locator } from "@playwright/test";
import _ from "lodash";

import { BaseElement, Constructable } from "../index.elements";

export class ElementsList<T extends BaseElement> {
  constructor(
    protected DesiredComponent: Constructable<T>,
    private elementsLocator: Locator,
  ) {}

  async getAll(): Promise<T[]> {
    const allElements = await this.resolveAllElements();
    return _.times(allElements.length).map(
      index => new this.DesiredComponent(allElements[index]),
    );
  }

  async getByIndex(index: number): Promise<T> {
    const allElements = await this.getAll();
    return allElements[index];
  }

  async getLength(): Promise<number> {
    const allElements = await this.getAll();
    return allElements.length;
  }

  private async resolveAllElements(): Promise<Locator[]> {
    return this.elementsLocator.all();
  }
}
