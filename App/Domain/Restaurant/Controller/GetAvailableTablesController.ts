import { ActionController } from "../../../Core/Controller/ActionController";
import { IHttpRequest } from "../../../Core/HttpServer/IHttpRequest";
import { IHttpResponse } from "../../../Core/HttpServer/IHttpResponse";
import { GetAvailableTablesQuery } from "../Type/Query/UseCase/GetAvailableTablesQuery";
import { GetRestaurantQuery } from "../Type/Query/UseCase/GetRestaurantQuery";
import { IGetAvailableTables } from "../UseCase/IGetAvailableTables";
import { IGetRestaurant } from "../UseCase/IGetRestaurant";
import { IGetAvailableTablesController } from "./IGetAvailableTablesController";
import { TablesListMapper } from "../Type/Mapper/TablesListMapper";

class GetAvailableTablesController extends ActionController
  implements IGetAvailableTablesController {
  public constructor(
    private readonly getAvailableTables: IGetAvailableTables,
    private readonly getRestaurant: IGetRestaurant
  ) {
    super();
  }

  public async perform(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const getRestaurantQuery = GetRestaurantQuery.create(request.Params.restaurantGuid);

      const restaurant = await this.getRestaurant.execute(getRestaurantQuery);

      const bookingDateTime = request.QueryString.bookingDateTime;

      const query = GetAvailableTablesQuery.create(restaurant, bookingDateTime);

      const availableTables = await this.getAvailableTables.execute(query);

      const tablesMapper = TablesListMapper.create(availableTables);

      return this.createSuccessResponse({
        data: tablesMapper.Data,
        message: `The list of available tables returned with successfully.`
      });
    } catch (error) {
      return this.createErrorResponse(error);
    }
  }
}

export { GetAvailableTablesController };
