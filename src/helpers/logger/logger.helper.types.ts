import { Logger } from "log4js";

export interface IGetSpecifiedArgs {
  logger: Logger;
  message: string;
  type: LogType;
  shouldAddReportStep?: boolean;
}

export enum LogType {
  info = "info",
  warn = "warn",
  debug = "debug",
  trace = "trace",
  error = "error",
  fatal = "fatal",
}

export interface IGetLogger {
  info: (message: string, params?: { shouldAddStep?: boolean }) => void;
  warn: (message: string, params?: { shouldAddStep?: boolean }) => void;
  debug: (message: string, params?: { shouldAddStep?: boolean }) => void;
  error: (message: string, params?: { shouldAddStep?: boolean }) => void;
  trace: (message: string, params?: { shouldAddStep?: boolean }) => void;
  fatal: (message: string, params?: { shouldAddStep?: boolean }) => void;
}
