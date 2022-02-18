import { commandContainer } from "./container";

export const Command =
  (name: string) =>
  (...args: any) => {
    if (commandContainer[name]) {
      throw new Error(
        "you can only have one command with the same command name: " + name
      );
    }
    commandContainer[name] = args[0];
  };
