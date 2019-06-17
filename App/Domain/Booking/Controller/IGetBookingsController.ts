import { IActionController } from "../../../Core/Controller/IActionController";

interface IGetBookingsController extends IActionController {}

const IGetBookingsController = Symbol.for("IGetBookingsController");

export { IGetBookingsController };
