import { Restaurant } from "../Entity/Restaurant";
import { IFindByGuidRestaurantQuery } from "../Type/Query/Service/IFindByGuidRestaurantQuery";

interface IRestaurantFinderService {
  findByGuid(query: IFindByGuidRestaurantQuery): Promise<Restaurant>;
  findAll(): Promise<Restaurant[]>;
}

const IRestaurantFinderService = Symbol.for("IRestaurantFinderService");

export { IRestaurantFinderService };
