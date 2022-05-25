import { dad } from "stepdad";
import { commandContainer } from "./decorators/container";
import minimist from "minimist";
import { Type } from "stepdad/dist/interfaces/Type";
import { Constructor, Indexable, InternalCommand } from "./types";
import { ParamDefiniton } from "./decorators/param";
import { CONSTRUCTOR, DEFAULT_COMMAND } from "./symbols";

type Resolver = <T>(target: Type<T>) => T;
export class CLIBuilder {
  private name: string = "";
  private dependencyResolver?: Resolver;

  /**
   * sets the name for this cli tool
   * @returns this
   */
  public setName(name: string) {
    this.name = name;

    return this;
  }

  /**
   * provide a custom dependecy resolver
   * @param resolver the custom reolver
   * @returns this
   */
  public setDependencyResolver(resolver: Resolver) {
    this.dependencyResolver = resolver;

    return this;
  }

  public execute() {
    // let minimist parse the process args
    let args = minimist(process.argv.slice(2));

    // find the closest command from the command container
    const commandName = Object.keys(commandContainer).sort((a, b) => {
      const count_a = numberOfMatches(args._, a.split(" "));
      const count_b = numberOfMatches(args._, b.split(" "));

      return count_b - count_a;
    });

    // get the command from the command container
    const fn = commandContainer.get(commandName[0] || DEFAULT_COMMAND);
    const commandNameDif = commandName[0]
      ? numberOfMatches(commandName[0].split(" "), args._)
      : 0;

    if (!fn) {
      throw new Error("could not find command");
    }

    // inject the dependencies
    let cmdFn: InternalCommand & Indexable;
    if (this.dependencyResolver) {
      cmdFn = this.dependencyResolver<typeof fn>(fn);
    } else {
      [cmdFn] = dad<InternalCommand & Indexable>(fn);
    }

    // map the positional arguments
    const posArgs = args._.slice(commandNameDif);
    if (fn.args) (cmdFn as any)[fn.args!] = posArgs;

    // map the parameter decorators to the actual process args
    Object.keys(args).map((a) => {
      if (a == "_" || a == "__") {
        return;
      }

      if (fn.params![a]) {
        // map full length param to command
        cmdFn[a] = this.parseArg(cmdFn, a, args[a]);
      } else if (
        Object.values<ParamDefiniton>(fn.params!).findIndex(
          (v) => v.short == a
        ) > -1
      ) {
        // search and map shorthand to command
        let flag = Object.values<ParamDefiniton>(fn.params!).find(
          (v) => v.short == a
        );

        cmdFn[flag!.name] = this.parseArg(cmdFn, flag!.name, args[a]);
      } else {
        //throw new Error("unknown arg: " + a);
      }
    });

    if (args.h || args.help) {
      console.log("-- HELP ---");
      cmdFn.description && console.log(cmdFn.description)

      const constructorAlias: any = cmdFn.constructor

      Object.keys(constructorAlias.params).forEach((k) => {
        const v: ParamDefiniton = constructorAlias.params[k]
        console.log(`  --${v.name}${v.short ? ", --" + v.short : ""} [${v.type.name}]${v.description ? " -> " + v.description : ""}`)
      })
      return
    }

    // execute the function
    cmdFn.run();
  }

  // cast to the correct type
  private parseArg(target: Constructor, key: string, value: any): any {
    const customFactory = Reflect.getMetadata(CONSTRUCTOR, target, key);
    const designType = Reflect.getMetadata("design:type", target, key);
    const factory = customFactory || designType;

    return factory(value);
  }
}

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
