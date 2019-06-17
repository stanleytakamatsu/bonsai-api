import { IGetRestaurantQuery } from "../Type/Query/UseCase/IGetRestaurantQuery";
import { Restaurant } from "../Entity/Restaurant";

interface IGetRestaurant {
  execute(query: IGetRestaurantQuery): Promise<Restaurant>;
}

const IGetRestaurant = Symbol.for("IGetRestaurant");

export { IGetRestaurant };
