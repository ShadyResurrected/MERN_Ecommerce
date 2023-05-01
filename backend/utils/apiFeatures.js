class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // search products using keywords
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword, // all the names that contains the keyword will be searched
            $options: "i", // it shows that the search will be case insensitive
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  // filter the searchspace with different criteria
  filter() {
    const queryCopy = { ...this.queryStr };

    // Removing new fields for category
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);

    // Filter for price and rating
    let queryStr = JSON.stringify(queryCopy);

    // gt is the upper bound of products
    // lt is lower bound of products
    // e signifies equality
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resultPerPage){
    const currentPage = Number(this.queryStr.page) || 1

    // skipping the products to display in the page accordingly
    const skip = resultPerPage * (currentPage - 1)

    this.query = this.query.limit(resultPerPage).skip(skip)
    
    return this
  }
}

module.exports = ApiFeatures;
