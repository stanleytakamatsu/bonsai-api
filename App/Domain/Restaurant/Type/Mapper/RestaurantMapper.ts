import { serialize } from "cerialize";
import { Restaurant } from "../../Entity/Restaurant";

class RestaurantMapper {
  private guid: string;
  private name: string;

  @serialize
  public get Guid(): string {
    return this.guid;
  }

  @serialize
  public get Name(): string {
    return this.name;
  }

  public static create(restaurant: Restaurant): RestaurantMapper {
    const mapper = new RestaurantMapper();

    mapper.guid = restaurant.Guid;
    mapper.name = restaurant.Name;

    return mapper;
  }
}

export { RestaurantMapper };
