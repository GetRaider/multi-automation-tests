import fs from "fs";

import { magicStrings } from "@constants/magic-strings.constants";
import { defaultEnvVariables } from "@constants/default-env-variables.constants";

const envFilePath = `${magicStrings.path.root}/.env`;

if (!fs.existsSync(envFilePath)) {
  console.info(`🔄 Creating .env file...`);
  fs.writeFileSync(envFilePath, defaultEnvVariables);
}
