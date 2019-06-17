import { IActionController } from "../../../Core/Controller/IActionController";

interface IGetRestaurantController extends IActionController {}

const IGetRestaurantController = Symbol.for("IGetRestaurantController");

export { IGetRestaurantController };
