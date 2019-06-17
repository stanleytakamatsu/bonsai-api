import { RecordNotFoundError } from "../../../Core/Error/Repository/RecordNotFoundError";
import { GenericError } from "../../../Core/Error/Service/GenericError";
import { Restaurant } from "../Entity/Restaurant";
import { IRestaurantRepository } from "../Repository/IRestaurantRepository";
import { RestaurantNotFoundError } from "../Type/Error/Service/RestaurantNotFoundError";
import { FindByGuidRestaurantQuery } from "../Type/Query/Repository/FindByGuidRestaurantQuery";
import { IFindByGuidRestaurantQuery } from "../Type/Query/Service/IFindByGuidRestaurantQuery";
import { IRestaurantFinderService } from "./IRestaurantFinderService";

class RestaurantFinderService implements IRestaurantFinderService {
  public constructor(private readonly repository: IRestaurantRepository) {}

  public async findByGuid(query: IFindByGuidRestaurantQuery): Promise<Restaurant> {
    try {
      const repositoryQuery = FindByGuidRestaurantQuery.create(query.Guid);

      return await this.repository.findByGuid(repositoryQuery);
    } catch (error) {
      this.throwSpecificErrorBasedOn(error);
    }
  }

  public async findAll(): Promise<Restaurant[]> {
    try {
      return await this.repository.findAll();
    } catch (error) {
      this.throwSpecificErrorBasedOn(error);
    }
  }

  private throwSpecificErrorBasedOn(error: Error): void {
    switch (error.constructor) {
      case RecordNotFoundError:
        throw new RestaurantNotFoundError(error.message);
      default:
        throw new GenericError(error.message, error);
    }
  }
}

export { RestaurantFinderService };
