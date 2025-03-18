import { IExecution, ISkipDetails, ISuiteArgs } from "./test.helper.types";
import { loggerHelper } from "../logger/logger.helper";
import { envHelper } from "../env/env.helper";
import { TestDetails } from "@playwright/test";
import { test as testFixture } from "@fixtures/common.fixture";

const logger = loggerHelper.get("TestHelper");

class TestHelper {
  runSuite({
    name: suiteName,
    tests,
    beforeAll,
    beforeEach,
    afterEach,
    afterAll,
    type,
  }: ISuiteArgs): void {
    const isWebTests = type === "web";
    testFixture.describe(suiteName, () => {
      this.runHook("beforeAll", beforeAll);

      this.runHook("beforeEach", beforeEach, isWebTests);
      this.runHook("afterEach", afterEach, isWebTests);

      tests.forEach(({ test, name, skip, testCaseId }) => {
        const nameWithTestId = `${name} [${testCaseId}]`;

        this.shouldSkip(skip)
          ? this.skip(nameWithTestId, skip, test)
          : this.runTest(nameWithTestId, test, isWebTests);
      });

      this.runHook("afterAll", afterAll);
    });
  }

  private runTest(
    name: string,
    test: (args: IExecution) => Promise<void>,
    isWebTests: boolean,
  ): void {
    isWebTests
      ? testFixture(name, async ({ web, api }) => {
          await test({ web, api });
        })
      : testFixture(name, async ({ api }) => {
          await test({ api });
        });
  }

  private runHook(
    hook: "beforeAll" | "beforeEach" | "afterEach" | "afterAll",
    callback?: (args: IExecution) => Promise<void>,
    isWebTests = false,
  ): void {
    if (!callback) return;

    let hookRunner = null;

    // playwright doesn't have 'page' fixture on 'beforeAll' and 'afterAll' so 'web' can't be used
    if (hook === "beforeAll" || hook === "afterAll") {
      hookRunner = async ({ api }) => await callback({ api });
    } else {
      hookRunner = isWebTests
        ? async ({ web, api }) => await callback({ web, api })
        : async ({ api }) => await callback({ api });
    }

    testFixture[hook](hookRunner);
  }

  private skip(
    name: string,
    skipDetails: ISkipDetails,
    test: (args: IExecution) => Promise<void>,
  ): void {
    // todo: add some log for terminal on skip
    // logger.warn(``)
    testFixture.skip(
      name,
      this.getSkipAnnotation(skipDetails),
      async () => await test({}),
    );
  }

  skipInRuntime(disable: ISkipDetails, beforeSkipLogMessage?: string): void {
    if (beforeSkipLogMessage) logger.warn(`❗️ ${beforeSkipLogMessage}`);
    this.addDisableAnnotations(disable);
    testFixture.skip(true, `Please check the disable details above ⬆️`);
  }

  private shouldSkip(skipDetails: ISkipDetails): boolean {
    return skipDetails
      ? !skipDetails.env || skipDetails.env === envHelper.getEnv()
      : false;
  }

  private addDisableAnnotations(disable: ISkipDetails): void {
    testFixture.info().annotations.push({
      type: "❕ Reason",
      description: disable.reason,
    });
    if (disable?.link) {
      testFixture.info().annotations.push({
        type: "🔗 Link",
        description: disable.link,
      });
    }
  }

  private getSkipAnnotation(disable: ISkipDetails): TestDetails {
    return {
      annotation: [
        { type: "❕ Reason", description: `️${disable.reason}` },
        { type: "🔗 Link", description: disable.link || "---" },
      ],
    };
  }
}

export const testHelper = new TestHelper();
