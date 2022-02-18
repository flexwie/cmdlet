export interface ICommand {
  run: (...args: never) => void;
}

export interface InternalCommand extends ICommand {
  params?: any;
  new (...args: any): any;
}
