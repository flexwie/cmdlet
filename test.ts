import { Service, Command, ICommand, Param, execute, Argument } from "./src";

@Service()
class ServiceClass {
  public process() {
    console.log("doing some preprocessing");
  }
}

@Command("command and")
class Base implements ICommand {
  @Param text?: string;
  @Argument args?: string[];

  constructor(private service: ServiceClass) {}

  run() {
    this.service.process();
    console.log(this.text + "3");
    console.log(this.args);
  }
}

@Command("command and")
class Test implements ICommand {
  @Param text?: string;

  constructor(private service: ServiceClass) {}

  run() {
    this.service.process();
    console.log(this.text + "2");
  }
}

// test area
execute();
