import { loggerHelper } from "@helpers/logger/logger.helper";
import { IDropdownArgs, BaseElement } from "../index.elements";

const logger = loggerHelper.get("DropdownElement");

export class DropdownElement<Options> extends BaseElement {
  readonly options: Options = null;
  constructor(args: IDropdownArgs<Options>) {
    const { dropdownButton, options } = args;
    super(dropdownButton);
    this.options = options;
  }

  async selectOptionByIndex(index: number): Promise<void> {
    await super.click();
    const entries = Object.entries(this.options);
    return entries[index][1].click();
  }

  async selectFirstOption(): Promise<void> {
    await super.click();
    const entries = Object.entries(this.options);
    return entries[0][1].click();
  }

  async selectFirstExistingOption(): Promise<void> {
    await super.click();
    for (const [optionName, option] of Object.entries(this.options)) {
      if (option.isDisplayed()) {
        return option.click();
      }
      logger.debug(`'${optionName}' option is not displayed - taking next one`);
    }
  }

  async selectOptionByName(name: string): Promise<void> {
    await super.click();
    return this.options[name].click();
  }
}
