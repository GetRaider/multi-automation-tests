# Test Automation Framework for UI & API tests

## Summary

### Test Automation framework that supports multi-applications for UI & API tests based on Playwright and written with TypeScript.

## Pre-requisites

- [node.js](https://nodejs.org/en) >= 18.20.7
- [npm](https://nodejs.org/en) >= 10.8.2

## Pre-conditions

1. Execute `npm install`

## Environment Variables

| Variable                   | Example                     | Description                                                                                                                         |
| -------------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| \*APP                      | `bbc`                       | required app name                                                                                                                   |
| \*ENV                      | `prod`                      | required env, default `prod`                                                                                                        |
| \*SPECS_TYPE               | `web`                       | required specs type to run. Can be: `all` or `ui`                                                                                   |
| SPEC_NAMES                 | `sign-in,test-helper-usage` | requirespecs names separated by comma which will be executed locally, if no or disabled will execute all specs, disabled by default |
| TEST_RETRY                 | `1`                         | retries N times if test fails, disabled by default                                                                                  |
| TEST_TIMEOUT               | `30_000`                    | custom test timeout, disabled by default                                                                                            |
| TEST_RUN_TIMEOUT           | `120_000`                   | custom test runner timeout, disabled by default                                                                                     |
| LOG_LEVEL                  | `DEBUG`                     | desired log level, disabled by default. Can be: ALL, TRACE, INFO, DEBUG                                                             |
| TESTOMAT_REPORT_GENERATION | `false`                     | desired option to generate testomat test run report or not. Can be: true or false                                                   |
| TESTOMATIO_TITLE           | `your own title`            | desired testomat test run report title to run locally.                                                                              |
| TESTOMAT_API_KEY           | `api key`                   | testomat api key to run locally. Can be taken from GH actions secrets or lastPass note                                              |

## Local test/s execution by mods:

- _**headed**_ - with opening browser (command can be shortened to `npm t`)

`npm run test`

- _**ui**_ - with opening browser in specified app with all devtools, traces, and other playwright features

`npm run test:ui`

- _**debug**_ - with opening browser and specified debug app to pause/resume test

`npm run test:debug`

- _**headless**_ - without opening browser and other playwright features

`npm run test:headless`

## CI test/s execution by the "Specific Test" trigger:

1. Navigate to the "Specific Test Run" CI trigger
2. Click the "Run workflow" drop-down
3. Select a branch, write a spec name/s by comma separated, and select specs type
