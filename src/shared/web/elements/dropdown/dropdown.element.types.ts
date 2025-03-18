import { ElementSearcher } from "@helpers/element-finder/types/index.types";

export interface IDropdownArgs<Options> {
  dropdownButton: ElementSearcher;
  options: Options;
}
