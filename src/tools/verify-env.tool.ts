import { processEnv } from "@helpers/processEnv/processEnv.helper";
import { loggerHelper } from "@helpers/logger/logger.helper";
import { envHelper } from "@helpers/env/env.helper";
import { configHelper } from "@helpers/config/config.helper";

const logger = loggerHelper.get("VerifyEnv");
const { ENV, SPECS_TYPE, APP } = processEnv;

void (() => {
  const variables = { ENV, SPECS_TYPE, APP };
  Object.entries(variables).forEach(([name, value]) => {
    if (!value) {
      logger.fatal(`'${name}' is not specified!`);
      process.exit(1);
    }
  });
  const runModeName = configHelper.isParallelRun() ? "parallel" : "sequential";
  logger.info(`Successfully verified .env config!`);
  const config = `\n        APP: ${envHelper.getAppName()}\n        ENV: ${envHelper.getEnv()}\n        URL: ${envHelper.getBaseUrl()}\n        SPECS-TYPE: ${envHelper.getSpecsType()}\n        MODE: ${runModeName}\n        PID: ${
    process.pid
  }`;
  logger.warn(`Test-Run Configuration: ${config}`);
})();
