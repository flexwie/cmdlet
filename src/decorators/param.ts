export const Param: any = (a: any, b: any) => {
  let parameters: any = (a.constructor.params = []);

  parameters[b] = {
    name: b,
    required: true,
  };
};
