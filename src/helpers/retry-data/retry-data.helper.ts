import fs from "fs";

import { magicStrings } from "@constants/magic-strings.constants";
import { IRetryDataHelper } from "./retry-data.helper.types";

class RetryDataHelper implements IRetryDataHelper {
  private readonly retryFolderPath = `${magicStrings.path.artifacts}/retries`;

  create(data: Record<string, unknown>, retryName: string): void {
    !fs.existsSync(`${this.retryFolderPath}`) &&
      fs.mkdirSync(`${magicStrings.path.artifacts}/retries`);
    fs.writeFileSync(
      `${this.retryFolderPath}/${retryName}.json`,
      JSON.stringify(data),
    );
  }

  getByName<R>(retryName: string): Record<string, R> {
    return JSON.parse(
      fs.readFileSync(`${this.retryFolderPath}/${retryName}.json`)?.toString(),
    );
  }

  isExistByName(retryName: string): boolean {
    return fs.existsSync(`${this.retryFolderPath}/${retryName}.json`);
  }
}

export const retryDataHelper = new RetryDataHelper();
