import path from "node:path";

import { fileHelper } from "../file/file.helper";
import { magicStrings } from "@constants/magic-strings.constants";
import { processEnv } from "../processEnv/processEnv.helper";
import { configHelper } from "../config/config.helper";
import {
  IGetFilteredNamesArgs,
  ISpecSelectorHelper,
} from "./spec-selector.helper.types";

const { SPEC_NAMES, SPECS_TYPE, SPECS_FOLDER_NAME } = processEnv;

class SpecSelectorHelper implements ISpecSelectorHelper {
  private readonly excludeTextOnParallelRun = "";

  get(): string[] {
    return this.getFilteredNames({
      allSpecNames: this.getAllNamesByDir(this.getFullDir()),
      desiredSpecNames: this.getDesiredNames(SPEC_NAMES),
    });
  }

  private getDesiredNames(currentSpecNamesString: string): string[] {
    return currentSpecNamesString?.length
      ? currentSpecNamesString.split(",")
      : [];
  }

  private getFilteredNames(args: IGetFilteredNamesArgs): string[] {
    const { allSpecNames, desiredSpecNames } = args;
    return desiredSpecNames.length
      ? allSpecNames.filter(specFileName => {
          return desiredSpecNames.some(desiredSpecName =>
            specFileName.includes(desiredSpecName),
          );
        })
      : allSpecNames;
  }

  private getAllNamesByDir(dir: string): string[] {
    return fileHelper
      .getFilePathsFromDirSync(dir, {
        excludeText:
          configHelper.isParallelRun() && this.excludeTextOnParallelRun,
        errorMessage: `Unable to get specs by this path - check your .env config!
Path: ${dir}`,
      })
      .map(specFilePath => path.basename(specFilePath));
  }

  private getFullDir(): string {
    return `${this.getRootDirByType(SPECS_TYPE)}${
      SPECS_FOLDER_NAME?.length ? `/${SPECS_FOLDER_NAME}` : ""
    }`;
  }

  private getRootDirByType(type: string): string {
    switch (type) {
      case "web":
        return magicStrings.path.webSpecs;
      case "api":
        return magicStrings.path.apiSpecs;
      default:
        throw new Error(`Please specify SPECS_TYPE via: web, api or all`);
    }
  }
}

export const specSelectorHelper = new SpecSelectorHelper();
