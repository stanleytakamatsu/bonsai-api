import { serialize } from "cerialize";
import * as moment from "moment";
import { BusinessHour } from "../../Entity/BusinessHour";

class BusinessHourMapper {
  private guid: string;
  private weekday: string;
  private startHour: string;
  private endHour: string;

  @serialize
  public get Guid(): string {
    return this.guid;
  }

  @serialize
  public get Weekday(): string {
    return this.weekday;
  }

  @serialize
  public get StartHour(): string {
    return this.startHour;
  }

  @serialize
  public get EndHour(): string {
    return this.endHour;
  }

  public static create(businessHour: BusinessHour): BusinessHourMapper {
    const mapper = new BusinessHourMapper();

    mapper.guid = businessHour.Guid;
    mapper.weekday = businessHour.Weekday;
    mapper.startHour = moment(businessHour.StartHour, "HH").format("HH:mm");
    mapper.endHour = moment(businessHour.EndHour, "HH").format("HH:mm");

    return mapper;
  }
}

export { BusinessHourMapper };
