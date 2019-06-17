import * as Joi from "joi";
import { WeekDays } from "../../../../../Core/Type/Options/WeekDays";

const AddBusinessHourSchema = Joi.object().keys({
  RestaurantGuid: Joi.string()
    .guid()
    .required(),
  Weekday: Joi.string()
    .allow(Object.values(WeekDays))
    .required(),
  StartHour: Joi.string()
    .regex(/^([0-9]{2})\:([0-9]{2})$/)
    .required(),
  EndHour: Joi.string()
    .regex(/^([0-9]{2})\:([0-9]{2})$/)
    .required()
});

export { AddBusinessHourSchema };
