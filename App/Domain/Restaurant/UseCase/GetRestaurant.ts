import { ILogger } from "../../../Core/Logger/ILogger";
import { Restaurant } from "../Entity/Restaurant";
import { IRestaurantFinderService } from "../Service/IRestaurantFinderService";
import { RestaurantNotFoundError as RestaurantNotFoundServiceError } from "../Type/Error/Service/RestaurantNotFoundError";
import { GetRestaurantGenericError } from "../Type/Error/UseCase/GetRestaurantGenericError";
import { RestaurantNotFoundError } from "../Type/Error/UseCase/RestaurantNotFoundError";
import { FindByGuidRestaurantQuery } from "../Type/Query/Service/FindByGuidRestaurantQuery";
import { IGetRestaurantQuery } from "../Type/Query/UseCase/IGetRestaurantQuery";
import { IGetRestaurant } from "./IGetRestaurant";

class GetRestaurant implements IGetRestaurant {
  public constructor(
    private readonly findService: IRestaurantFinderService,
    private readonly logger: ILogger
  ) {}

  public async execute(query: IGetRestaurantQuery): Promise<Restaurant> {
    try {
      const serviceQuery = FindByGuidRestaurantQuery.create(query.Guid);

      return await this.findService.findByGuid(serviceQuery);
    } catch (error) {
      this.throwSpecificErrorBasedOn(error);
    }
  }

  private throwSpecificErrorBasedOn(error: Error): void {
    switch (error.constructor) {
      case RestaurantNotFoundServiceError:
        this.logger.warning(error.message, error);

        throw new RestaurantNotFoundError();
      default:
        this.logger.error(error.message, error);

        throw new GetRestaurantGenericError(error);
    }
  }
}

export { GetRestaurant };
