import axios from "axios";
import Swal from "sweetalert2"

export function getProducts() {
  return (dispatch) => {
    fetch("http://localhost:3001/product")
      .then((res) => res.json())
      .then((json) => {
        dispatch({
          type: "GET_PRODUCTS",
          payload: json,
        });
      });
  };
}

export function getProductsDetails(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/product/${id}`);
      return dispatch({
        type: "GET_PRODUCT_DETAILS",
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getCategories() {
  return (dispatch) => {
    fetch("http://localhost:3001/category")
      .then((res) => res.json())
      .then((json) => {
        dispatch({
          type: "GET_CATEGORIES",
          payload: json,
        });
      });
  };
}

export function postCategory(payload) {
  return async (dispatch) => {
    const response = await axios.post(
      `http://localhost:3001/category`,
      payload
    );
    Swal.fire({
      title: 'Category Created',
      icon: 'success',
      confirmButtonText: 'Continue'
    })
    return response;
  };
}

export function postProduct(payload) {
  console.log(`Payload de action postProduct: `);
  console.dir(payload);
  Swal.fire({
    title: 'Product Created',
    icon: 'success',
    confirmButtonText: 'Continue'
  })
  return async (dispatch) => {
    const response = await axios.post(`http://localhost:3001/product`, payload);
    return response;
  };
}

export function getProductsByName(name) {
  return async function (dispatch) {
    try {
      var json = await axios(`http://localhost:3001/product?name=${name}`);
      return dispatch({
        type: "GET_PRODUCTS_BY_NAME",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function putProduct(id, body) {
  return async function (dispatch) {
    try {
      let res = await axios.put(`http://localhost:3001/product/${id}`, body);
      return dispatch({
        type: "PUT_PRODUCT",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteProduct(id) {
  return async function (dispatch) {
    try {
      let res = await axios.delete(`http://localhost:3001/product/${id}`);
      return dispatch({
        type: "DELETE_PRODUCT",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function putCategory(id, body) {
  return async function (dispatch) {
    try {
      let res = await axios.put(`http://localhost:3001/category/${id}`, body);
      return dispatch({
        type: "PUT_CATEGORY",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteCategory(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`http://localhost:3001/category/${id}`);
      return dispatch({
        type: "DELETE_CATEGORY",
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

/*export function postReviews(id, payload) {
  return async function (dispatch) {
    try {
      await axios.post(`http://localhost:3001/rating/${id}`, payload);
      return dispatch({
        type: "CREATE_REVIEW",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
}*/

export function getReviews(id) {
  return async function (dispatch) {
    try {
      const result = await axios.get("/review/" + id + "?order=DESC");
      return dispatch({
        type: "GET_REVIEWS",
        payload: result.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//SORT

export function alphabeticalOrder(payload) {
  return {
    type: "ALPHABETICAL_ORDER",
    payload,
  };
}

export function orderByRating(payload) {
  return {
    type: "ORDER_BY_RATING",
    payload,
  };
}

export function orderByPrice(payload) {
  return {
    type: "ORDER_BY_PRICE",
    payload,
  };
}

export function filterByCategories(payload) {
  return {
    type: "FILTER_BY_CATEGORIES",
    payload,
  };
}

export function searchProduct(payload) {
  return {
    type: "SEARCH_PRODUCT",
    payload,
  };
}

//ORDERS & CART
export function postOrder(payload) {
  return async (dispatch) => {
    const response = await axios.post("http://localhost:3001/orders", payload);
    //console.log(response)
    return dispatch({
      type: "CREATE_ORDER",

      payload: payload,
      response,
    });
  };
}

export function getOrders() {
  return async function (dispatch) {
    try {
      let json = await axios.get("http://localhost:3001/orders");
      return dispatch({
        type: "GET_ORDERS",
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getOrderDetail(id) {
  return async function (dispatch) {
    const detail = await axios.get(`http://localhost:3001/orders/${id}`);
    return dispatch({
      type: "GET_ORDER_DETAIL",
      payload: detail?.data,
    });
  };
}

export function putOrder(id, body) {
  return async function (dispatch) {
    try {
      let res = await axios.put(
        `http://localhost:3001/orders/status/${id}`,
        body
      );
      return dispatch({
        type: "PUT_ORDER",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

/*export function getOrdersByUser(userId) {
  return async function (dispatch) {
    try {
      const res = await axios.get(
        `http://localhost:3001/orders/user/${userId}`
      );
      dispatch({
        type: "GET_ORDERS_BY_USER",
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}*/

export function setCart(cart) {
  return {
    type: "SET_CART",
    payload: cart,
  };
}

export function getCart() {
  return {
    type: "GET_CART",
  };
}

export function addCart(productId, amount, images, title) {
  return {
    type: "ADD_CART",
    payload: { productId, amount, images, title },
  };
}

export function changeItemCart(productId, quantity, amount) {
  return {
    type: "ONE_ITEM_CART",
    payload: { productId, quantity, amount },
  };
}

export function removeCart(productId) {
  return {
    type: "DELETE_ITEMS",
    payload: { productId },
  };
}

export function removeItem(productId) {
  return {
    type: "DELETE_ITEM",
    payload: { productId },
  };
}

// AUTH

export function signNewUser(payload) {
  return async function (dispatch) {
    try {
      await axios.post(`http://localhost:3001/user`, payload);
      return dispatch({
        type: "SIGN_USER",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// USERS

export const GET_USERS = "GET_USERS";
export const SET_ACTIVE_INACTIVE = "SET_ACTIVE_INACTIVE";
export const TURN_INTO_ADMIN_OR_USER = "TURN_INTO_ADMIN_OR_USER";

export function getUsers() {
  return (dispatch) => {
    fetch("http://localhost:3001/user")
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: GET_USERS,
          payload: data,
        });
      });
  };
}

export function setActiveInactive(objEmail) {
  return async function (dispatch) {
    try {
      let res = await axios.put(`http://localhost:3001/user`, objEmail);
      return dispatch({
        type: SET_ACTIVE_INACTIVE,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function turnIntoAdminOrUser(id) {
  return async function (dispatch) {
    try {
      let res = await axios.put(`http://localhost:3001/user/${id}`);
      return dispatch({
        type: TURN_INTO_ADMIN_OR_USER,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function loginUser(payload) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/user/login`,
        payload
      );
      //set JWT token to local
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("isAdmin", response.data.isAdmin);
      sessionStorage.setItem("userId", response.data.id);
      sessionStorage.setItem("email", response.data.email);
      Swal.fire({
        title: 'Welcome',
        icon: 'success',
        confirmButtonText: 'Continue'
      })
      return dispatch({
        type: "LOGIN_USER",
        payload: response.data,
      });
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
}

export function testIsUser(payload) {
  return async (dispatch) => {
    try {
      console.log("action data", payload);
      const response = await axios.post(
        `http://localhost:3001/user/isuser/${payload.email}`,
        payload
      );
      return dispatch({
        type: "TEST_IS_USER",
        payload: response.data,
      });
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
}

export function isSocialUser(payload) {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/user/socialuser/${payload.sub}`
      );
      return dispatch({
        type: "IS_SOCIAL_USER",
        payload: response.data,
      });
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
}

export function getUserProfile(payload) {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/user/profile/${payload.id}`
      );
      return dispatch({
        type: "GET_USER_PROFILE",
        payload: response.data,
      });
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
}

export function updateUserProfile(payload) {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/user/profile/${payload.id}`,
        payload
      );
      Swal.fire({
        title: 'Data updated!',
        icon: 'success',
        confirmButtonText: 'Continue'
      })
      return dispatch({
        type: "UPADTE_USER_PROFILE",
        payload: response.data,
      });
      
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
}

export function logOut() {
  try {
    //Unset JWT token to local
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("isAdmin");
    sessionStorage.removeItem("userId");
    return {
      type: "LOGOUT_USER",
      payload: "",
    };
  } catch (error) {
    console.log(error);
  }
}

export function resetPassword(payload) {
  return async function () {
    try {
      let response = await axios.post(
        `http://localhost:3001/user/reset`,
        payload
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", response.data.mail);
      Swal.fire({
        title: 'Email sent!',
        icon: 'success',
        confirmButtonText: 'Continue'
      })
      
    } catch (error) {
      Swal.fire({
        title: 'Invalid Email',
        icon: 'error',
        confirmButtonText: 'Continue'
      })
    }
  };
}
export function resetConfirm(payload) {
  return async function () {
    try {
      let response = await axios.put(
        `http://localhost:3001/user/reset/${payload.email}/${payload.token}`,
        payload
      );
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    } catch (error) {
      console.log(error);
    }
  };
}


// WISHLIST-START

export function getUserWishList() {
  const user_id = sessionStorage.getItem("userId");
  return (dispatch) => {
    fetch("http://localhost:3001/wishlist?user_id=" + user_id)
      .then((res) => res.json())
      .then((json) => {
        dispatch({
          type: "GET_USER_WISH_LIST",
          payload: json.wishListItems,
        });
      });
  };
}

export function saveUserWishList(payload) {
  console.log(`Payload de action saveUserWishList: `);
  console.dir(payload);
  return async (dispatch) => {
    const response = await axios.post(`http://localhost:3001/wishlist`, payload);
    return response;
  };
}

export function addProductToWishList(productId, thumbnail, title, description, price) {
  return {
    type: "ADD_PRODUCT_TO_WISH_LIST",
    payload: { productId, thumbnail, title, description, price },
  };
}

export function removeProductFromWishList(productId) {
  return {
    type: "REMOVE_PRODUCT_FROM_WISH_LIST",
    payload: productId,
  };
}

// WISHLIST-END


export function filterByStatus(type) {
  return {
    type: "FILTER_BY_STATUS",
    payload: type,
  };
}

export function cancellOrder(id) {
  return async function (dispatch){
    try {
      await axios.delete(`http://localhost:3001/orders/${id}`);
      return dispatch({
        type: 'CANCELL_ORDER',
        payload: '',
      });
    } catch (error) {
      console.log(error);
    }
  }
}
export function confirmOrder(id) {
  return async function (dispatch){
    try {
      await axios.post(`http://localhost:3001/orders/${id}`);
      return dispatch({
        type: 'CONFIRM_ORDER',
        payload: '',
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export function shippingOrder(id) {
  return async function (dispatch){
    try {
      await axios.put(`http://localhost:3001/orders/shipping/${id}`);
      return dispatch({
        type: 'SHIPPING_ORDER',
        payload: '',
      });
    } catch (error) {
      console.log(error);
    }
  }
}



export function notOrder(payload) {
 
  return async function () {
    try {
      
      let response = await axios.post(
        `http://localhost:3001/checkout/success`,
        payload
      );
      
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", response.data.mail);
    } catch (error) {
      console.log(error);
    }
  };
}

export function notShippOrder(payload) {
  
 
  return async function () {
    try {
      
      let response = await axios.post(
        `http://localhost:3001/checkout/success/shipping/`,
        payload
      );
      
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", response.data.mail);
    } catch (error) {
      console.log(error);
    }
  };
}

