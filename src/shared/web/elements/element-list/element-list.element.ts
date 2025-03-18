import { Locator } from "@playwright/test";
import _ from "lodash";

import { IPwElementsSearcher } from "@helpers/element-finder/types/index.types";
import { BaseElement, Constructable } from "../index.elements";

export class ElementsList<T extends BaseElement> {
  constructor(
    protected DesiredComponent: Constructable<T>,
    public es: IPwElementsSearcher,
  ) {}

  get elements(): Promise<Locator[]> {
    return this.es.findElements();
  }

  getElementByIndex(index: number): T {
    return new this.DesiredComponent(this.es.getElementByIndex(index));
  }

  async getLength(): Promise<number> {
    return (await this.elements).length;
  }

  async getAllElements(): Promise<T[]> {
    return _.times(await this.getLength()).map(index =>
      this.getElementByIndex(index),
    );
  }
}
