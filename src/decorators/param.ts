export const Param: any = (a: any, b: any) => {
  let definitions: any = (a.constructor.params = []);

  definitions[b] = {
    name: b,
    required: true,
  };
};
