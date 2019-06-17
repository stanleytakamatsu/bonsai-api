import { IFilterQuery } from "./IFilterQuery";

class FilterQuery implements IFilterQuery {
  private criteria: any = {};

  private options: any = {};

  public get Criteria(): any {
    return this.criteria;
  }

  public get Options(): any {
    return this.options;
  }

  public static create(criteria: any = {}, options: any = {}): FilterQuery {
    const filter = new FilterQuery();

    filter.criteria = criteria;
    filter.options = options;

    return filter;
  }
}

export { FilterQuery };
