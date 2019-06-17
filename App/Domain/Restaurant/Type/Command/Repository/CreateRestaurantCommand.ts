import { Restaurant } from "../../../Entity/Restaurant";
import { ICreateRestaurantCommand } from "./ICreateRestaurantCommand";

class CreateRestaurantCommand implements ICreateRestaurantCommand {
  private restaurant: Restaurant;

  public get Restaurant(): Restaurant {
    return this.restaurant;
  }

  public static create(restaunrat: Restaurant): CreateRestaurantCommand {
    const command = new CreateRestaurantCommand();

    command.restaurant = restaunrat;

    return command;
  }
}

export { CreateRestaurantCommand };
