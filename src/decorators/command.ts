import { commandContainer } from "./container";

export const Command =
  (name: string) =>
  (...args: any) => {
    commandContainer[name] = args[0];
  };
