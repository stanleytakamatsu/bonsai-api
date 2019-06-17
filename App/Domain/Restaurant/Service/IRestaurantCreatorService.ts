import { ICreateRestaurantCommand } from "../Type/Command/Service/ICreateRestaurantCommand";

interface IRestaurantCreatorService {
  create(command: ICreateRestaurantCommand): Promise<void>;
}

const IRestaurantCreatorService = Symbol.for("IRestaurantCreatorService");

export { IRestaurantCreatorService };
