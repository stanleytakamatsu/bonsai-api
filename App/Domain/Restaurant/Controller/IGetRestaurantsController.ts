import { IActionController } from "../../../Core/Controller/IActionController";

interface IGetRestaurantsController extends IActionController {}

const IGetRestaurantsController = Symbol.for("IGetRestaurantsController");

export { IGetRestaurantsController };
