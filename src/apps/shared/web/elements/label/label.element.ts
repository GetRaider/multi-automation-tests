import { Locator } from "@playwright/test";

import { BaseElement } from "../index.elements";

export class LabelElement extends BaseElement {
  constructor(protected override element: Locator) {
    super(element);
  }
}
