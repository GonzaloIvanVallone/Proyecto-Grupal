import axios from 'axios';

export function getProducts(){
    return (dispatch) => {
        fetch('http://localhost:3001/products')
         .then((res) => res.json())
         .then((json) => {
            dispatch({
                type: 'GET_PRODUCTS',
                payload: json,
            })
         })
    }
};

export function getNameProducts(name) {
    return async function (dispatch) {
      try {
        var json = await axios.get(
          `https://dummyjson.com/products/search?q=${name}`
        );
        return dispatch({
          type: "GET_NAME_PRODUCTS",
          payload: json.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
  }



export function getCategories(){
    return (dispatch) => {
        fetch('http://localhost:3001/products/categories')
         .then((res) => res.json())
         .then((json) => {
            dispatch({
                type: 'GET_CATEGORIES',
                payload: json,
            })
         })
    }
};

export function getDetail(id) {
    return async function (dispatch) {
      try {
        var json = await axios.get(
          `https://dummyjson.com/products/${id}`
        );
  
        return dispatch({
          type: "GET_DETAILS",
          payload: json.data,
        });
      } catch (error) {
        console.log("catcheo");
        console.log(error);
      }
    };
  }

export function postProduct(payload){
    return async (dispatch) => {
        const response = await axios.post(
          `http://localhost:3001/products`,
          payload
        );
        return response;
      };
}

export function alphabeticalOrder(payload){
    return {
        type: 'ALPHABETICAL_ORDER',
        payload
    }
};

export function orderByRating(payload){
    return {
        type: 'ORDER_BY_RATING',
        payload
    }
};

export function filterByCategories(genre){
    return {
            type: 'FILTER_BY_CATEGORIES', 
            payload: categories
        }    
};

