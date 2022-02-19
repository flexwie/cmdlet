import { InternalCommand } from "../types";

class Container extends Map {
  public register(name: string | Symbol, command: any) {
    if (this.has(name)) {
      throw new Error("duplicate key");
    }

    this.set(name, command);
  }
}

export const commandContainer = new Container();
