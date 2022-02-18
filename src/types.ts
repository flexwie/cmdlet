export interface ICommand {
  run: (...args: never) => void;
}

export interface InternalCommand extends ICommand {
  params?: any;
  args?: string;
  new (...args: any): any;
}
