export type ParamOptions = {
  [index: string]: any;
  required?: boolean;
  description?: string;
  overrideHandle?: string;
  short?: string;
};

export type ParamDefiniton = {
  name: string;
  required?: boolean;
  short?: string;
};

/**
 * parameter factory thats maps command line arguments to properties
 * @param otps
 * @returns
 */
export const Param = (otps: ParamOptions) => (target: any, fnName: string) => {
  let parameters: any = (target.constructor.params = []);

  parameters[fnName] = {
    name: fnName,
    required: true,
    short: otps.short,
  };
};
