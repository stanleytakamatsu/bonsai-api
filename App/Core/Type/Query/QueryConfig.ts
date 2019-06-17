class QueryConfig {
  private limit: number;

  private offset: number;

  private order: SortOptions;

  private orderBy: string;

  public get Limit(): number {
    return this.limit;
  }

  public get Offset(): number {
    return this.offset;
  }

  public get Order(): SortOptions {
    return this.order;
  }

  public get OrderBy(): string {
    return this.orderBy;
  }

  public static create(limit: number, offset: number, order: string, orderBy: string): QueryConfig {
    const queryConfig = new QueryConfig();

    queryConfig.limit = limit;
    queryConfig.offset = offset;
    queryConfig.order = <SortOptions>order;
    queryConfig.orderBy = orderBy;

    return queryConfig;
  }
}
