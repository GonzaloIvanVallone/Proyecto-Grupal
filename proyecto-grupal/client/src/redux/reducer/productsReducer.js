const initialState = {
  products: [],
  allProducts: [],
  categories: [],
  detail: [],
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        allProducts: action.payload,
      };
    case "GET_NAME_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "GET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };

    case "GET_DETAILS":
      return {
        ...state,
        detail: action.payload,
      };
    case "POST_PRODUCT":
      return {
        ...state,
      };
    case "ALPHABETICAL_ORDER":
      let sortedArr =
        action.payload === "asc"
          ? state.products.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.products.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        products: sortedArr,
      };
    case "ORDER_BY_RATING":
      let sortedArr2 =
        action.payload === "desc"
          ? state.products.sort(function (a, b) {
              if (a.rating > b.rating) {
                return 1;
              }
              if (b.rating > a.rating) {
                return -1;
              }
              return 0;
            })
          : state.products.sort(function (a, b) {
              if (a.rating > b.rating) {
                return -1;
              }
              if (b.rating > a.rating) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        products: sortedArr2,
      };
    case "FILTER_BY_CATEGORIES":
      const allProductsCategories = state.allProducts;
      const categoriesFiltered =
        action.payload === "All"
          ? allProductsCategories
          : allProductsCategories.filter((products) =>
              products.categories.includes(action.payload)
            );
      return {
        ...state,
        products: categoriesFiltered,
      };
    default:
      return { ...state };
  }
}
