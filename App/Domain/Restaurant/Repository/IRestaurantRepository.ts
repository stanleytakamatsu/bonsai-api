import { Restaurant } from "../Entity/Restaurant";
import { ICreateRestaurantCommand } from "../Type/Command/Repository/ICreateRestaurantCommand";
import { IFindByGuidRestaurantQuery } from "../Type/Query/Repository/IFindByGuidRestaurantQuery";
import { IAddBusinessHourCommand } from "../Type/Command/Repository/IAddBusinessHourCommand";

interface IRestaurantRepository {
  createRestaurant(command: ICreateRestaurantCommand): Promise<void>;
  addBusinessHour(command: IAddBusinessHourCommand): Promise<void>;
  findByGuid(query: IFindByGuidRestaurantQuery): Promise<Restaurant>;
  findAll(): Promise<Restaurant[]>;
}

const IRestaurantRepository = Symbol.for("IRestaurantRepository");

export { IRestaurantRepository };
