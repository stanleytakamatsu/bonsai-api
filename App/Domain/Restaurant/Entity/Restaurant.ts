import * as moment from "moment-timezone";

import { GuidGenerator } from "../../../Core/Hash/Guid/GuidGenerator";
import { IRestaurantModel } from "../Repository/Model/IRestaurantModel";
import { BusinessHour } from "./BusinessHour";

class Restaurant {
  private id: string;

  private guid: string;

  private name: string;

  private businessHours: BusinessHour[] = [];

  private createdAt: moment.Moment;

  private updatedAt: moment.Moment;

  public get Id(): string {
    return this.id;
  }

  public get Guid(): string {
    return this.guid;
  }

  public get Name(): string {
    return this.name;
  }

  public get BusinessHours(): BusinessHour[] {
    return this.businessHours;
  }

  public get CreatedAt(): moment.Moment {
    return this.createdAt;
  }

  public get UpdatedAt(): moment.Moment {
    return this.updatedAt;
  }

  public static create(name: string): Restaurant {
    const restaurant = new Restaurant();

    restaurant.guid = GuidGenerator.generate();
    restaurant.name = name;
    restaurant.createdAt = moment();
    restaurant.updatedAt = moment();

    return restaurant;
  }

  public static createFromRecord(record: IRestaurantModel): Restaurant {
    const restaurant = new Restaurant();

    restaurant.id = record.id;
    restaurant.guid = record.guid;
    restaurant.name = record.name;
    restaurant.businessHours = Array.from(record.businessHours || []).map(businessHour =>
      BusinessHour.createFromRecord(businessHour)
    );
    restaurant.createdAt = moment(record.createdAt);
    restaurant.updatedAt = moment(record.updatedAt);

    return restaurant;
  }
}

export { Restaurant };
