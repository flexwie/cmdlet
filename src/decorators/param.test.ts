import "reflect-metadata";
import { ParamOptions, Param } from "./param";

class Test {
  public Number: number = 0;
}

describe("Parameter Decorater", () => {
  it("should detect type", () => {
    Param()(Test.prototype, "Number");

    console.log((Test.constructor as any).params);
  });
});
