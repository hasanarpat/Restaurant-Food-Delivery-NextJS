export interface PaginationResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export type QueryParams = {
  page?: string | number;
  limit?: string | number;
  sort?: string;
  fields?: string;
  [key: string]: any;
};

export class QueryBuilder {
  public page: number;
  public limit: number;
  public skip: number;
  public sort: any;
  public filter: any;

  constructor(query: QueryParams) {
    this.page = Number(query.page) || 1;
    this.limit = Number(query.limit) || 10;
    this.skip = (this.page - 1) * this.limit;

    // Default sort by createdAt desc if not provided
    this.sort = query.sort ? query.sort.split(',').join(' ') : '-createdAt';

    // Filter handling: exclude page, limit, sort, fields
    const excludedFields = ['page', 'limit', 'sort', 'fields'];
    const filterObj = { ...query };
    excludedFields.forEach((el) => delete filterObj[el]);

    // Advanced filtering (gt, gte, etc.) could be handled here
    // For now simple match
    this.filter = filterObj;
  }
}
