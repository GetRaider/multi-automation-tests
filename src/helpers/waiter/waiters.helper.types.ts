export interface IWaitOptions {
  errorMessage?: string;
  interval?: number;
  throwError?: boolean;
}

export interface ISleepOptions {
  sleepReason?: string;
  ignoreReason?: boolean;
}

export interface IRetryOptions extends IWaitOptions {
  continueWithException?: boolean;
  resolveWhenNoException?: boolean;
}
