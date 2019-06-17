import * as Joi from "joi";

const AddTableSchema = Joi.object().keys({
  RestaurantGuid: Joi.string()
    .guid()
    .required(),
  Code: Joi.string().required()
});

export { AddTableSchema };
