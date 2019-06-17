import { ILogger } from "../../../Core/Logger/ILogger";
import { Restaurant } from "../Entity/Restaurant";
import { IRestaurantFinderService } from "../Service/IRestaurantFinderService";
import { GetRestaurantsGenericError } from "../Type/Error/UseCase/GetRestaurantsGenericError";
import { IGetRestaurants } from "./IGetRestaurants";

class GetRestaurants implements IGetRestaurants {
  public constructor(
    private readonly findService: IRestaurantFinderService,
    private readonly logger: ILogger
  ) {}

  public async execute(): Promise<Restaurant[]> {
    try {
      return await this.findService.findAll();
    } catch (error) {
      this.logger.error(error.message, error);

      throw new GetRestaurantsGenericError(error);
    }
  }
}

export { GetRestaurants };
