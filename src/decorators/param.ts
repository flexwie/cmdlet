import { CONSTRUCTOR } from "../symbols";

export type ParamOptions = {
  [index: string]: any;
  required?: boolean;
  description?: string;
  overrideHandle?: string;
  short?: string;
  customCasting?: any;
};

export type ParamDefiniton = {
  name: string;
  required?: boolean;
  short?: string;
  description?: string
  type: any;
};

/**
 * parameter factory thats maps command line arguments to properties
 * @param opts
 * @returns
 */
export const Param = (opts?: ParamOptions) => (target: any, fnName: string) => {
  let parameters: any = (target.constructor.params = []);
  let type = Reflect.getMetadata("design:type", target, fnName);

  if (opts && opts.customCasting) {
    Reflect.defineMetadata(CONSTRUCTOR, opts.customCasting, target, fnName);
  }

  parameters[fnName] = {
    name: fnName,
    required: true,
    short: opts?.short,
    type,
    description: opts?.description
  };
};
