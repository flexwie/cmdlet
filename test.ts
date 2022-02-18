import { Service, Command, ICommand, Param, execute } from "./src";

@Service()
class ServiceClass {
  public process() {
    console.log("doing some preprocessing");
  }
}

@Command("command and conquer")
class Base implements ICommand {
  @Param text?: string;

  constructor(private service: ServiceClass) {}

  run() {
    this.service.process();
    console.log(this.text);
  }
}

// test area
execute();
