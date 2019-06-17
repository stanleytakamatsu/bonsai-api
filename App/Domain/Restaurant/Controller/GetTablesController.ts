import { ActionController } from "../../../Core/Controller/ActionController";
import { IHttpRequest } from "../../../Core/HttpServer/IHttpRequest";
import { IHttpResponse } from "../../../Core/HttpServer/IHttpResponse";
import { TablesListMapper } from "../Type/Mapper/TablesListMapper";
import { GetRestaurantQuery } from "../Type/Query/UseCase/GetRestaurantQuery";
import { GetTablesQuery } from "../Type/Query/UseCase/GetTablesQuery";
import { IGetRestaurant } from "../UseCase/IGetRestaurant";
import { IGetTables } from "../UseCase/IGetTables";
import { IGetRestaurantController } from "./IGetRestaurantController";

class GetTablesController extends ActionController implements IGetRestaurantController {
  public constructor(
    private readonly getTables: IGetTables,
    private readonly getRestaurant: IGetRestaurant
  ) {
    super();
  }

  public async perform(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const getRestaurantQuery = GetRestaurantQuery.create(request.Params.restaurantGuid);

      const restaurant = await this.getRestaurant.execute(getRestaurantQuery);

      const getTablesQuery = GetTablesQuery.create(restaurant);

      const tables = await this.getTables.execute(getTablesQuery);

      const mapper = TablesListMapper.create(tables);

      return this.createSuccessResponse({
        data: mapper.Data,
        message: `The list of table returned with successfully.`
      });
    } catch (error) {
      return this.createErrorResponse(error);
    }
  }
}

export { GetTablesController };
