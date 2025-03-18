import { IApi, IWeb } from "@fixtures/common.fixture.types";

export interface IExecution {
  web?: IWeb;
  api?: IApi;
}

export interface ISuiteArgs {
  name: string;
  tests: ITest[];
  // It doesn't have 'web' because it creates 'page' fixture in before each hook per each test
  beforeAll?: (params: Pick<IExecution, "api">) => Promise<void>;
  beforeEach?: (params: IExecution) => Promise<void>;
  // It doesn't have 'web' because it creates 'page' fixture in before each hook per each test
  afterAll?: (params: Pick<IExecution, "api">) => Promise<void>;
  afterEach?: (params: IExecution) => Promise<void>;
  type: "web" | "api";
}

export interface ITest {
  name: string;
  // TODO: Make required arg
  testCaseId?: string;
  test: (args: IExecution) => Promise<void>;
  skip?: ISkipDetails;
}

export interface ISkipDetails {
  reason: string;
  link?: string;
  env?: string;
}
