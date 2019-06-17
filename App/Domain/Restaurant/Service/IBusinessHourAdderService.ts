import { IAddBusinessHourCommand } from "../Type/Command/Service/IAddBusinessHourCommand";

interface IBusinessHourAdderService {
  add(command: IAddBusinessHourCommand): Promise<void>;
}

const IBusinessHourAdderService = Symbol.for("IBusinessHourAdderService");

export { IBusinessHourAdderService };
