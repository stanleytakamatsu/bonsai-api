import { ActionController } from "../../../Core/Controller/ActionController";
import { IHttpRequest } from "../../../Core/HttpServer/IHttpRequest";
import { IHttpResponse } from "../../../Core/HttpServer/IHttpResponse";
import { GetRestaurantQuery } from "../../Restaurant/Type/Query/UseCase/GetRestaurantQuery";
import { IGetRestaurant } from "../../Restaurant/UseCase/IGetRestaurant";
import { AddTableParameterFactory } from "../Factory/AddTableParameterFactory";
import { AddTableCommand } from "../Type/Command/UseCase/AddTableCommand";
import { IAddTable } from "../UseCase/IAddTable";
import { IAddTableValidator } from "../Validator/IAddTableValidator";
import { IAddTableController } from "./IAddTableController";

class AddTableController extends ActionController implements IAddTableController {
  public constructor(
    private readonly addTable: IAddTable,
    private readonly getRestaurant: IGetRestaurant,
    private readonly validator: IAddTableValidator
  ) {
    super();
  }

  public async perform(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const params = AddTableParameterFactory.create(request);

      this.validator.validate(params);

      const getRestaurantQuery = GetRestaurantQuery.create(params.RestaurantGuid);

      const restaurant = await this.getRestaurant.execute(getRestaurantQuery);

      const command = AddTableCommand.create(params.Code, restaurant);

      await this.addTable.execute(command);

      return this.createSuccessResponse({
        message: `Added the table with code "${params.Code}" with successfully.`
      });
    } catch (error) {
      return this.createErrorResponse(error);
    }
  }
}

export { AddTableController };
