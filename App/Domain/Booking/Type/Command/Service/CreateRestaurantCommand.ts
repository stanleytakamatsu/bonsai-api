import { Restaurant } from "../../../Entity/Restaurant";
import { ICreateRestaurantCommand } from "./ICreateRestaurantCommand";

class CreateRestaurantCommand implements ICreateRestaurantCommand {
  private restaurant: Restaurant;

  public get Restaurant(): Restaurant {
    return this.restaurant;
  }

  public static create(restaurant: Restaurant): CreateRestaurantCommand {
    const command = new CreateRestaurantCommand();

    command.restaurant = restaurant;

    return command;
  }
}

export { CreateRestaurantCommand };
