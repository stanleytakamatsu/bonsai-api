import { Restaurant } from "../../../../Restaurant/Entity/Restaurant";
import { IAddTableCommand } from "./IAddTableCommand";

class AddTableCommand implements IAddTableCommand {
  private restaurant: Restaurant;

  private code: string;

  public get Code(): string {
    return this.code;
  }

  public get Restaurant(): Restaurant {
    return this.restaurant;
  }

  public static create(code: string, restaurant: Restaurant): AddTableCommand {
    const command = new AddTableCommand();

    command.code = code;
    command.restaurant = restaurant;

    return command;
  }
}

export { AddTableCommand };
