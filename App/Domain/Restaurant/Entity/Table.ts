import * as moment from "moment-timezone";

import { GuidGenerator } from "../../../Core/Hash/Guid/GuidGenerator";
import { Restaurant } from "../../Restaurant/Entity/Restaurant";
import { ITableModel } from "../Repository/Model/ITableModel";

class Table {
  private id: string;

  private guid: string;

  private restaurantId: string;

  private code: string;

  private createdAt: moment.Moment;

  private updatedAt: moment.Moment;

  public get Id(): string {
    return this.id;
  }

  public get Guid(): string {
    return this.guid;
  }

  public get RestaurantId(): string {
    return this.restaurantId;
  }

  public get Code(): string {
    return this.code;
  }

  public get CreatedAt(): moment.Moment {
    return this.createdAt;
  }

  public get UpdatedAt(): moment.Moment {
    return this.updatedAt;
  }

  public static create(code: string, restaurant: Restaurant): Table {
    const table = new Table();

    table.guid = GuidGenerator.generate();
    table.code = code;
    table.restaurantId = restaurant.Id;
    table.createdAt = moment();
    table.updatedAt = moment();

    return table;
  }

  public static createFromRecord(record: ITableModel): Table {
    const table = new Table();

    table.id = record.id;
    table.guid = record.guid;
    table.code = record.code;
    table.restaurantId = record.restaurantId;
    table.createdAt = moment(record.createdAt);
    table.updatedAt = moment(record.updatedAt);

    return table;
  }
}

export { Table };
