import { expect, test } from "@fixtures/common.fixture";
import { envHelper } from "@helpers/env/env.helper";

test.describe("Sport section", () => {
  test.beforeEach(async ({ web }) => {
    await web.browser.openUrl(
      `${envHelper.getBaseUrl()}/sport/football/scores-fixtures`,
    );
  });

  test("Some matches are present", async ({ web }) => {
    const allCurrentMatches = await web.app.bbc.sport.getAllCurrentMatches();
    expect(allCurrentMatches.length).toBeGreaterThanOrEqual(0);
    console.debug({ allCurrentMatches });
  });

  test("Header is present", async ({ web }) => {
    expect(await web.app.bbc.sport.isHeaderDisplayed()).toBeTruthy();
  });
});
