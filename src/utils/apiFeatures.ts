class APIFeatures {
  query: any;
  queryString: Record<string, any>;

  constructor(query: any, queryString: any) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = [
      'page',
      'sort',
      'limit',
      'fields',
      'deleted',
      'pageSize',
      'search',
    ];
    excludedFields.forEach((field) => delete queryObj[field]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    const parsedQuery = JSON.parse(queryStr);

    if (Object.keys(parsedQuery).length > 0) {
      this.query = this.query.find(parsedQuery);
    }

    return this;
  }

  search(searchFields: string[]) {
    if (this.queryString.search && searchFields.length) {
      const regex = new RegExp(this.queryString.search, 'i');
      const searchConditions = searchFields.map((field) => ({ [field]: regex }));

      this.query = this.query.find({ $or: searchConditions });
    }

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

}

export default APIFeatures;
