import { IElementSearcher } from "@helpers/element-finder/types/index.types";
import { BaseElement } from "../index.elements";

export class InputElement extends BaseElement {
  constructor(protected override elementSearcher: IElementSearcher) {
    super(elementSearcher);
  }

  async enterText(text: string, options?: { timeout: number }): Promise<void> {
    return (await this.element).fill(text, options);
  }
}
