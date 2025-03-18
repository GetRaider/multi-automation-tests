export interface IWaitUntilDisplayed {
  errorMessage?: string;
  throwError?: boolean;
}

export interface IClickParams {
  timeout?: number;
  force?: boolean;
  throwError?: boolean;
}

export interface IGetTextParams {
  timeout?: number;
  throwError?: boolean;
}

export interface IGetValueParams extends IGetTextParams {}

export interface IHoverParams extends IGetTextParams {}
