import { serializeAs } from "cerialize";

import { Restaurant } from "../../Entity/Restaurant";
import { RestaurantMapper } from "./RestaurantMapper";

class RestaurantListMapper {
  private data: RestaurantMapper[];

  @serializeAs(RestaurantMapper)
  public get Data(): RestaurantMapper[] {
    return this.data;
  }

  public static create(restaurants: Restaurant[]): RestaurantListMapper {
    const mapper = new RestaurantListMapper();

    mapper.data = restaurants.map(restaurant => RestaurantMapper.create(restaurant));

    return mapper;
  }
}

export { RestaurantListMapper };
