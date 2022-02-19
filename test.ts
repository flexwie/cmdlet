import { Service, Command, ICommand, Param, Argument, CLIBuilder } from "./src";

@Service()
class ServiceClass {
  public process() {
    console.log("doing some preprocessing");
  }
}

@Command("command and")
class Base implements ICommand {
  @Param({ short: "t" }) text?: string;
  @Argument args?: string[];

  constructor(private service: ServiceClass) {}

  run() {
    this.service.process();
    console.log(this.text + "3");
    console.log(this.args);
  }
}

@Command()
class Test implements ICommand {
  @Param({}) text?: string;

  constructor(private service: ServiceClass) {}

  run() {
    this.service.process();
    console.log(this.text + "2");
  }
}

// test area
const cli = new CLIBuilder()
  .setName("Toolkit")
  .setDependencyResolver((target) => new target(new ServiceClass()))
  .execute();
