import { Restaurant } from "../../../Entity/Restaurant";

interface ICreateRestaurantCommand {
  Restaurant: Restaurant;
}

const ICreateRestaurantCommand = Symbol.for("ICreateRestaurantCommand");

export { ICreateRestaurantCommand };
