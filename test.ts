import { Service, Command, ICommand, Param, Argument, CLIBuilder } from "./src";

@Service()
class ServiceClass {
  public process() {
    console.log("doing some preprocessing");
  }
}

@Command()
class Base implements ICommand {
  @Param({ short: "t", description: "Test Flag" })
  text?: boolean;
  @Argument args?: string[];

  description = "Example Command Description"

  constructor(private service: ServiceClass) { }

  run() {
    console.log(this.args)
    this.service.process()
    console.log(this.text);
  }
}

// @Command("Test")
// class Test implements ICommand {
//   @Param() text?: string;

//   constructor(private service: ServiceClass) { }

//   run() {
//     console.log("Test")
//     this.service.process();
//     console.log(this.text + "2");
//   }
// }

// test area
const cli = new CLIBuilder()
  .setName("Toolkit")
  .setDependencyResolver((target) => new target(new ServiceClass()))
  .execute();
