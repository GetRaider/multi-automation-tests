import fs from "fs";
import path from "node:path";

import {
  IGetFilePathsFromDirSyncOptions,
  IReadDirOptions,
} from "./file.helper.types";
import { loggerHelper } from "@helpers/logger/logger.helper";

const logger = loggerHelper.get("FileHelper");

class FileHelper {
  getFilePathsFromDirSync(
    dirPath: string,
    {
      throwError,
      errorMessage,
      excludeText,
    }: IGetFilePathsFromDirSyncOptions = {},
  ): string[] {
    const entries = this.readDirByPath(dirPath, { throwError, errorMessage });
    const files: string[] = [];

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (excludeText && fullPath.includes(excludeText)) {
        continue;
      }
      if (entry.isDirectory()) {
        const subFiles = this.getFilePathsFromDirSync(fullPath, {
          excludeText,
          throwError,
          errorMessage,
        });
        files.push(...subFiles);
      }
      if (entry.isFile()) {
        files.push(fullPath);
      }
    }
    return files;
  }

  readDirByPath(
    path: string,
    { throwError = true, errorMessage }: IReadDirOptions,
  ): fs.Dirent[] {
    try {
      return fs.readdirSync(path, { withFileTypes: true });
    } catch (error) {
      if (throwError) {
        logger.fatal(`${errorMessage ?? error.message}`);
        process.exit(1);
      }
    }
  }
}

export const fileHelper = new FileHelper();
