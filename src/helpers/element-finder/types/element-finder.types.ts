import { IBaseElementFinder, PwMethodName } from "./base-element-finder.types";
import { IElementSearcher, IElementSearchOptions } from "./index.types";
import { ElementsFinderHelper } from "../elements-finder.helper";

export interface ElementFinderInterface
  extends IBaseElementFinder<IElementSearcher> {
  all: ElementsFinderHelper;
}

export interface IPwSearchArgs {
  pwMethod: IPwMethod;
  customMethod?: string;
  esOptions?: IElementSearchOptions;
}

export interface IPwMethod {
  name: PwMethodName;
  args: unknown[];
}
