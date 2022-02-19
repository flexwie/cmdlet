import { commandContainer } from "./container";
import { DEFAULT_COMMAND } from "../symbols";

/**
 * registers the command with the command container
 * @param name command name / subcommand path
 * @returns
 */
export function Command(): (...args: any) => void;
export function Command(name: string): (...args: any) => void;
export function Command(name?: any) {
  return (...args: any) => {
    if (name) {
      commandContainer.register(name, args[0]);
    } else {
      commandContainer.register(DEFAULT_COMMAND, args[0]);
    }
  };
}
