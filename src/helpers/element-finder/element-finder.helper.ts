import { Locator } from "@playwright/test";

import {
  FindElement,
  IPwElementFinderArgs,
  IPwElementSearcher,
} from "./types/index.types";
import { BaseElementFinderHelper } from "./base-element-finder.helper";
import { ElementsFinderHelper } from "@helpers/element-finder/elements-finder.helper";
import { IPwSearchArgs } from "@helpers/element-finder/types/element-finder.types";

export class ElementFinderHelper extends BaseElementFinderHelper<IPwElementSearcher> {
  protected readonly searchRoot: FindElement = null;

  constructor(args: IPwElementFinderArgs<FindElement>) {
    const { searchRoot } = args;
    super(args);
    this.searchRoot = searchRoot;
  }

  get all(): ElementsFinderHelper {
    return new ElementsFinderHelper({
      pwPage: this.page,
      searchRoot: this.searchRoot,
    });
  }

  protected search(args: IPwSearchArgs): IPwElementSearcher {
    const { pwMethod, esOptions = {} } = args;
    const { takeFirstElement, frameLocator } = esOptions;
    const locator = `${pwMethod.name}(${pwMethod.args})`;

    const findElement = async (): Promise<Locator> => {
      const root = this.searchRoot ? await this.searchRoot() : this.page;
      const element: Locator = frameLocator
        ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          root.frameLocator(frameLocator)[pwMethod.name](...pwMethod.args)
        : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          root[pwMethod.name](...pwMethod.args);
      return takeFirstElement ? element.first() : element;
    };
    return {
      findElement,
      locator,
    };
  }
}
