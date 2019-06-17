import { IActionController } from "../../../Core/Controller/IActionController";

interface IMakeBookingController extends IActionController {}

const IMakeBookingController = Symbol.for("IMakeBookingController");

export { IMakeBookingController };
