import { processEnv } from "../processEnv/processEnv.helper";
import { magicStrings } from "@constants/magic-strings.constants";
import { envHelper } from "../env/env.helper";
import { primitiveHelper } from "../primitive/primitive.helper";

class ConfigHelper {
  getTestRetry(): number {
    const localRetry = Number(processEnv.TEST_RETRY) || 0;
    return envHelper.isCI() ? 1 : localRetry;
  }

  getWorkers(): number {
    return this.isParallelRun() ? undefined : 1;
  }

  getReportersList(): unknown {
    const commonReporters: unknown[] = [
      [
        "html",
        {
          outputFolder: `${magicStrings.path.artifacts}/reports/playwright-report`,
        },
      ],
      ["list"],
    ];
    if (!envHelper.isCI() && this.shouldRunTestomatReport()) {
      processEnv.TESTOMATIO_TITLE = `Local at: ${primitiveHelper.getCurrentDateTime()}`;
    }
    if (this.shouldRunTestomatReport()) {
      commonReporters.push([
        "@testomatio/reporter/lib/adapter/playwright.js",
        {
          apiKey: processEnv.TESTOMAT_API_KEY,
        },
      ]);
    }

    return commonReporters;
  }

  shouldRunTestomatReport(): boolean {
    return primitiveHelper.string.toBoolean(
      processEnv.TESTOMAT_REPORT_GENERATION,
    );
  }

  isParallelRun(): boolean {
    return primitiveHelper.string.toBoolean(processEnv.IS_PARALLEL_RUN);
  }
}

export const configHelper = new ConfigHelper();
