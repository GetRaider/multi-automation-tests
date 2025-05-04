import { Locator } from "@playwright/test";

export interface IDropdownArgs<Options> {
  dropdownButton: Locator;
  options: Options;
}
