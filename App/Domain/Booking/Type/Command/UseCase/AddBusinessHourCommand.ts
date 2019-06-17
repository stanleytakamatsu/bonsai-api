import { Restaurant } from "../../../Entity/Restaurant";
import { IAddBusinessHourCommand } from "./IAddBusinessHourCommand";
import { WeekDays } from "../../../../../Core/Type/Options/WeekDays";

class AddBusinessHourCommand implements IAddBusinessHourCommand {
  private restaurant: Restaurant;

  private weekday: WeekDays;

  private startHour: number;

  private endHour: number;

  public get Weekday(): WeekDays {
    return this.weekday;
  }

  public get StartHour(): number {
    return this.startHour;
  }

  public get EndHour(): number {
    return this.endHour;
  }

  public get Restaurant(): Restaurant {
    return this.restaurant;
  }

  public static create(
    weekday: WeekDays,
    startHour: string,
    endHour: string,
    restaurant: Restaurant
  ): AddBusinessHourCommand {
    const command = new AddBusinessHourCommand();

    command.weekday = weekday;
    command.startHour = Number(startHour.split(":")[0]);
    command.endHour = Number(endHour.split(":")[0]);
    command.restaurant = restaurant;

    return command;
  }
}

export { AddBusinessHourCommand };
