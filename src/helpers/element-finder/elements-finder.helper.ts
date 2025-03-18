import { Locator } from "@playwright/test";

import {
  FindElement,
  IPwElementFinderArgs,
  IPwElementsSearcher,
} from "./types/index.types";
import { BaseElementFinderHelper } from "./base-element-finder.helper";
import { IPwSearchArgs } from "@helpers/element-finder/types/element-finder.types";

export class ElementsFinderHelper extends BaseElementFinderHelper<IPwElementsSearcher> {
  protected readonly searchRoot: FindElement = null;

  constructor(args: IPwElementFinderArgs<FindElement>) {
    const { searchRoot } = args;
    super(args);
    this.searchRoot = searchRoot;
  }

  protected search(args: IPwSearchArgs): IPwElementsSearcher {
    const { pwMethod, esOptions = {} } = args;
    const { frameLocator } = esOptions;
    const locator = `${pwMethod.name}(${pwMethod.args})`;

    const findElements = async (): Promise<Locator[]> => {
      const root = this.searchRoot ? await this.searchRoot() : this.page;
      const element: Locator = frameLocator
        ? root.frameLocator(frameLocator)[
            pwMethod.name
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
          ](...pwMethod.args)
        : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          root[pwMethod.name](...pwMethod.args);
      return element.all();
    };
    const getElementByIndex = (index: number) => {
      async function findElement() {
        return (await findElements())[index];
      }
      return {
        findElement,
        locator: `${locator}[${index}]`,
      };
    };
    return {
      findElements,
      getElementByIndex,
      locator,
    };
  }
}
