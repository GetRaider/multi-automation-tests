import { config } from "dotenv";

config();

interface IProcessEnvHelper {
  APP: string;
  ENV: string;
  USER_PASSWORD: string;
  SPEC_NAMES: string;
  SPECS_FOLDER_NAME: string;
  SPECS_TYPE: string;
  CI: string;
  CUSTOM_WEB_URL: string;
  CUSTOM_API_URL: string;
  LOG_LEVEL: string;
  TEST_RETRY: string;
  TEST_TIMEOUT: string;
  TEST_RUN_TIMEOUT: string;
  IS_PARALLEL_RUN: string;
  HTML_REPORT_NAME: string;
  TESTOMAT_REPORT_GENERATION: string;
  TESTOMAT_API_KEY: string;
  TESTOMATIO_TITLE: string;
}

export const processEnv = process.env as unknown as IProcessEnvHelper;
