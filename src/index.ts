import { Inject } from "stepdad";

export { execute } from "./executor";
export { ICommand } from "./types";
export * from "./decorators";
export const Service = Inject;
