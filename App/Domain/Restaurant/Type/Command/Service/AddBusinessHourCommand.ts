import { Restaurant } from "../../../Entity/Restaurant";
import { IAddBusinessHourCommand } from "./IAddBusinessHourCommand";
import { BusinessHour } from "../../../Entity/BusinessHour";

class AddBusinessHourCommand implements IAddBusinessHourCommand {
  private restaurant: Restaurant;

  private businessHour: BusinessHour;

  public get BusinessHour(): BusinessHour {
    return this.businessHour;
  }

  public get Restaurant(): Restaurant {
    return this.restaurant;
  }

  public static create(businessHour: BusinessHour, restaurant: Restaurant): AddBusinessHourCommand {
    const command = new AddBusinessHourCommand();

    command.businessHour = businessHour;
    command.restaurant = restaurant;

    return command;
  }
}

export { AddBusinessHourCommand };
