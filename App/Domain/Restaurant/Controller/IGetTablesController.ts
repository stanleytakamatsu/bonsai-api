import { IActionController } from "../../../Core/Controller/IActionController";

interface IGetTablesController extends IActionController {}

const IGetTablesController = Symbol.for("IGetTablesController");

export { IGetTablesController };
