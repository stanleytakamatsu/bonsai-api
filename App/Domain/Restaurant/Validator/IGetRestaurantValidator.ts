import { ISchemaValidator } from "../../../Core/Validator/Interface/ISchemaValidator";
import { IGetRestaurantParamter } from "../Type/Parameter/IGetRestaurantParamter";

interface IGetRestaurantValidator extends ISchemaValidator<IGetRestaurantParamter> {}

const IGetRestaurantValidator = Symbol.for("IGetRestaurantValidator");

export { IGetRestaurantValidator };
