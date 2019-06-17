import { Restaurant } from "../Entity/Restaurant";

interface IGetRestaurants {
  execute(): Promise<Restaurant[]>;
}

const IGetRestaurants = Symbol.for("IGetRestaurants");

export { IGetRestaurants };
