import { envHelper } from "@helpers/env/env.helper";

export const magicStrings = {
  url: {
    apps: {
      bbc: {
        web: {
          prod: {
            base: "https://www.bbc.com",
            signIn: "https://account.bbc.com/auth",
          },
        },
        api: {
          prod: {
            base: "https://www.bbc.com",
          },
        },
      },
      typicode: {
        web: {},
        api: {
          prod: {
            base: "http://jsonplaceholder.typicode.com",
            auth: "auth/token",
          },
        },
      },
    },
  },
  path: {
    root: process.cwd(),
    get artifacts() {
      return `${this.root}/artifacts`;
    },
    get screenshots() {
      return `${this.root}/artifacts/screenshots`;
    },
    get apiSpecs() {
      return `${this.root}/specs/${envHelper.getAppName()}/api`;
    },
    get webSpecs() {
      return `${this.root}/specs/${envHelper.getAppName()}/web`;
    },
  },
};
