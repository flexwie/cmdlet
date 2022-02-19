import { ParamOptions } from "./decorators/param";

export interface ICommand {
  run: (...args: never) => void;
}

export interface InternalCommand extends ICommand {
  params?: ParamOptions;
  args?: string;
  new (...args: any): any;
}
