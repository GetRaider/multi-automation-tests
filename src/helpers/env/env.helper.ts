import { processEnv } from "@helpers/processEnv/processEnv.helper";
import { magicStrings } from "@constants/magic-strings.constants";
import { primitiveHelper } from "@helpers/primitive/primitive.helper";
import { App } from "@helpers/assembler/assembler.helper.types";

const { ENV, CI, SPECS_TYPE, CUSTOM_WEB_URL, CUSTOM_API_URL } = processEnv;

export class EnvHelper {
  getEnv(): string {
    return ENV;
  }

  getAppName(): App {
    return processEnv.APP as App;
  }

  getSpecsType(): "web" | "api" {
    return SPECS_TYPE as "web" | "api";
  }

  getBaseUrl(): string {
    return this.getSpecsType() === "web"
      ? this.getBaseWebUrl()
      : this.getBaseApiUrl();
  }

  getBaseWebUrl(): string {
    if (this.isCustomWebUrl()) return CUSTOM_WEB_URL;
    try {
      return magicStrings.url.apps[this.getAppName()].web[this.getEnv()].base;
    } catch (error) {
      throw new Error(`Unable to get base web url - check your .env config!`);
    }
  }

  getBaseApiUrl(): string {
    if (this.isCustomApiUrl()) return CUSTOM_API_URL;
    try {
      return magicStrings.url.apps[this.getAppName()].api[this.getEnv()].base;
    } catch (error) {
      throw new Error(`Unable to get base api url - check your .env config!`);
    }
  }

  getAuthApiPath(): string {
    return magicStrings.url.apps[this.getAppName()].api[this.getEnv()].auth;
  }

  isCI(): boolean {
    return primitiveHelper.string.toBoolean(CI);
  }

  isCustomEnv(): boolean {
    return this.getEnv() === "custom";
  }

  isCustomWebUrl(): boolean {
    return Boolean(CUSTOM_WEB_URL?.length);
  }

  isCustomApiUrl(): boolean {
    return Boolean(CUSTOM_WEB_URL?.length);
  }
}

export const envHelper = new EnvHelper();
