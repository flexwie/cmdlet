import { dad } from "stepdad";
import { commandContainer } from "./decorators/container";
import minimist from "minimist";

export const execute = () => {
  // let minimist parse the process args
  let args = minimist(process.argv.slice(2));

  // find the closest command from the command container
  const commandName = Object.keys(commandContainer).sort((a, b) => {
    const count_a = numberOfMatches(args._, a.split(" "));
    const count_b = numberOfMatches(args._, b.split(" "));

    return count_b - count_a;
  });

  const commandNameDif = numberOfMatches(commandName[0].split(" "), args._);

  // get the command from the command container
  const fn = commandContainer[commandName[0] || ""];

  if (!fn) {
    throw new Error("could not find command");
  }

  // inject the dependencies
  let [cmdFn]: any = dad(fn);

  // map the positional arguments
  const posArgs = args._.slice(commandNameDif);
  if (fn.args) cmdFn[fn.args!] = posArgs;

  // map the parameter decorators to the actual process args
  Object.keys(args).map((a) => {
    if (a == "_" || a == "__") {
      return;
    }
    if (fn.params[a]) {
      cmdFn[a] = args[a];
    } else {
      throw new Error("unknown arg: " + a);
    }
  });

  // execute the function
  cmdFn.run();
};

/**
 * Calculates the number of matching parts in two string arrays
 * @returns number of matching string parts from the beginning
 */
const numberOfMatches = (a: string[], b: string[]): number => {
  let counter = 0;

  for (let i = 0; i < a.length; i++) {
    const e = a[i];
    if (e == b[i]) {
      counter++;
    } else {
      return counter;
    }
  }

  return counter;
};
