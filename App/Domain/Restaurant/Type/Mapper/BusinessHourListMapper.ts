import { serializeAs } from "cerialize";
import { BusinessHour } from "../../Entity/BusinessHour";
import { BusinessHourMapper } from "./BusinessHourMapper";

class BusinessHourListMapper {
  private data: BusinessHourMapper[];

  @serializeAs(BusinessHourMapper)
  public get Data(): BusinessHourMapper[] {
    return this.data;
  }

  public static create(businessHours: BusinessHour[]): BusinessHourListMapper {
    const mapper = new BusinessHourListMapper();

    mapper.data = businessHours.map(businessHour => BusinessHourMapper.create(businessHour));

    return mapper;
  }
}

export { BusinessHourListMapper };
