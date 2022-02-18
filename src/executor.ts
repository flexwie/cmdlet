import { dad } from "stepdad";
import { commandContainer } from "./decorators/container";
import minimist from "minimist";

export const execute = () => {
  let args = minimist(process.argv.slice(2));

  console.log(args);
  console.log(commandContainer);

  const fn = commandContainer[args._.join(" ")];

  if (!fn) {
    throw new Error("could not find command");
  }

  let [cmdFn]: any = dad(fn);

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

  cmdFn.run();
};
