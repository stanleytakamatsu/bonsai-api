import { IBusinessHourModel } from "../Repository/Model/IBusinessHourModel";
import { WeekDays } from "../../../Core/Type/Options/WeekDays";
import { GuidGenerator } from "../../../Core/Hash/Guid/GuidGenerator";

class BusinessHour {
  private id: string;

  private guid: string;

  private weekday: WeekDays;

  private startHour: number;

  private endHour: number;

  public get Id(): string {
    return this.id;
  }

  public get Guid(): string {
    return this.guid;
  }

  public get Weekday(): WeekDays {
    return this.weekday;
  }

  public get StartHour(): number {
    return this.startHour;
  }

  public get EndHour(): number {
    return this.endHour;
  }

  public static create(weekday: WeekDays, startHour: number, endHour: number): BusinessHour {
    const businessHour = new BusinessHour();

    businessHour.guid = GuidGenerator.generate();
    businessHour.weekday = weekday;
    businessHour.startHour = startHour;
    businessHour.endHour = endHour;

    return businessHour;
  }

  public static createFromRecord(record: IBusinessHourModel): BusinessHour {
    const businessHour = new BusinessHour();

    businessHour.id = record.id;
    businessHour.guid = record.guid;
    businessHour.weekday = <WeekDays>record.weekday;
    businessHour.startHour = record.startHour;
    businessHour.endHour = record.endHour;

    return businessHour;
  }
}

export { BusinessHour };
