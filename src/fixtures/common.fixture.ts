import { test as base } from "@playwright/test";

import { BrowserHelper } from "@helpers/browser/browser.helper";
import { ElementFinderHelper } from "@helpers/element-finder/element-finder.helper";
import { HttpClient } from "@shared-api/http/http-client";
import { AssemblerHelper } from "@helpers/assembler/assembler.helper";
import { IFixtures } from "@fixtures/common.fixture.types";

export const test = base.extend<IFixtures>({
  web: async ({ page: pwPage, context: pwContext }, use) => {
    const assembler = new AssemblerHelper({
      browserHelper: new BrowserHelper({ pwPage, pwContext }),
      elementFinder: new ElementFinderHelper({ pwPage }),
    });
    const web = assembler.web();
    await use(web);
  },

  api: async ({ playwright: { request } }, use) => {
    const assembler = new AssemblerHelper({
      httpClient: new HttpClient(request.newContext()),
    });
    const api = assembler.api();
    await use(api);
  },
});

export { expect } from "@playwright/test";
