import { ElementSearcher } from "@helpers/element-finder/types/index.types";
import { BaseElement } from "../index.elements";

export class LabelElement extends BaseElement {
  constructor(protected override elementSearcher: ElementSearcher) {
    super(elementSearcher);
  }
}
