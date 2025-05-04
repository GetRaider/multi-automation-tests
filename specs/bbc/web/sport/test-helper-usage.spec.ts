import { expect } from "@fixtures/common.fixture";
import { envHelper } from "@helpers/env/env.helper";
import { testHelper } from "@helpers/test/test.helper";

testHelper.runSuite({
  name: "Sport section",
  type: "web",
  beforeEach: async ({ web }) =>
    await web.browser.openUrl(
      `${envHelper.getBaseUrl()}/sport/football/scores-fixtures`,
    ),
  tests: [
    {
      name: "Some matches are present",
      test: async ({ web }) => {
        const allCurrentMatches =
          await web.app.bbc.sport.getAllCurrentMatches();
        expect(allCurrentMatches.length).toBeGreaterThanOrEqual(0);
        console.debug({ allCurrentMatches });
      },
    },
    {
      name: `Header is present`,
      test: async ({ web }) => {
        await web.browser.openUrl(
          `${envHelper.getBaseUrl()}/sport/football/scores-fixtures`,
        );
        expect(await web.app.bbc.sport.isHeaderDisplayed()).toBeTruthy();
      },
    },
  ],
});
