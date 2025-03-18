import { loggerHelper } from "@helpers/logger/logger.helper";

// eslint-disable-next-line @typescript-eslint/ban-types
export function ClassLog(target: Function) {
  const logger = loggerHelper.get(target.name);
  const argsToHide = ["password"];

  for (const propertyKey of Object.getOwnPropertyNames(target.prototype)) {
    const descriptor = Object.getOwnPropertyDescriptor(
      target.prototype,
      propertyKey,
    );

    if (
      descriptor &&
      typeof descriptor.value === "function" &&
      propertyKey !== "constructor"
    ) {
      const originalMethod = descriptor.value;

      descriptor.value = function (...args: never[]) {
        logger.trace(
          `${String(propertyKey)} ${JSON.stringify(
            secureArgs({ argsToCheck: args, argsToHide }),
          )}`,
        );
        return originalMethod.apply(this, args);
      };

      Object.defineProperty(target.prototype, propertyKey, descriptor);
    }
  }
}

function secureArgs({
  argsToCheck,
  argsToHide,
}: ISecureArgs): Record<string, unknown>[] | string[] {
  return argsToCheck.map(arg => {
    if (typeof arg === "string" && argsToHide.includes(arg)) {
      return "***";
    }
    if (typeof arg === "object") {
      for (const [key] of Object.entries(arg)) {
        if (argsToHide.includes(key)) {
          arg[key] = "***";
        }
      }
    }
    return arg;
  });
}

interface ISecureArgs {
  argsToCheck: Record<string, unknown>[] | string[];
  argsToHide: string[];
}
