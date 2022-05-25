import { ParamOptions } from "./decorators/param";

export interface ICommand {
  run: (...args: never) => void;
}

export type Constructor<T = any> = { new (...args: any[]): T };
export type Indexable = { [key: string]: any };

export interface InternalCommand extends ICommand {
  params?: ParamOptions;
  args?: string;
  new (...args: any): any;
}
