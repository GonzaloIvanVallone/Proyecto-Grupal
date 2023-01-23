import axios from "axios";
import Swal from "sweetalert2";

export function getProducts() {
  return (dispatch) => {
    fetch("https://proyecto-grupal-back-production.up.railway.app/product")
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
      var json = await axios.get(`https://proyecto-grupal-back-production.up.railway.app/product/${id}`);
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
    fetch("https://proyecto-grupal-back-production.up.railway.app/category")
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
      `https://proyecto-grupal-back-production.up.railway.app/category`,
      payload
    );
    return response;
  };
}

export function postProduct(payload) {
  console.log(`Payload de action postProduct: `);
  console.dir(payload);
  return async (dispatch) => {
    const response = await axios.post(`https://proyecto-grupal-back-production.up.railway.app/product`, payload);
    return response;
  };
}

export function getProductsByName(name) {
  return async function (dispatch) {
    try {
      var json = await axios(`https://proyecto-grupal-back-production.up.railway.app/product?name=${name}`);
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
      let res = await axios.put(`https://proyecto-grupal-back-production.up.railway.app/product/${id}`, body);
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
      let res = await axios.delete(`https://proyecto-grupal-back-production.up.railway.app/product/${id}`);
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
      let res = await axios.put(`https://proyecto-grupal-back-production.up.railway.app/category/${id}`, body);
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
      await axios.delete(`https://proyecto-grupal-back-production.up.railway.app/category/${id}`);
      return dispatch({
        type: "DELETE_CATEGORY",
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const postReview = (reviewData) => async (dispatch) => {
  try {
    const response = await axios.post(
      `https://proyecto-grupal-back-production.up.railway.app/product/${reviewData.productId}/reviews`,
      reviewData
    );
    console.log(response.data);
    dispatch({
      type: "POST_REVIEW",
      payload: response.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export function getReviews(id) {
  return async function (dispatch) {
    try {
      const res = await axios.get(`https://proyecto-grupal-back-production.up.railway.app/product/reviews/${id}`);
      return dispatch({
        type: "GET_REVIEWS",
        payload: res.data,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteReview(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`https://proyecto-grupal-back-production.up.railway.app/product/reviews/${id}`);
      return dispatch({
        type: "DELETE_REVIEW",
        payload: id,
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
    const response = await axios.post("https://proyecto-grupal-back-production.up.railway.app/orders", payload);
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
      let json = await axios.get("https://proyecto-grupal-back-production.up.railway.app/orders");
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
    const detail = await axios.get(`https://proyecto-grupal-back-production.up.railway.app/orders/${id}`);
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
        `https://proyecto-grupal-back-production.up.railway.app/orders/status/${id}`,
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
      await axios.post(`https://proyecto-grupal-back-production.up.railway.app/user`, payload);
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
    fetch("https://proyecto-grupal-back-production.up.railway.app/user")
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
      let res = await axios.put(`https://proyecto-grupal-back-production.up.railway.app/user`, objEmail);
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
      let res = await axios.put(`https://proyecto-grupal-back-production.up.railway.app/user/${id}`);
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
        `https://proyecto-grupal-back-production.up.railway.app/user/login`,
        payload
      );
      //set JWT token to local
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("isAdmin", response.data.isAdmin);
      sessionStorage.setItem("userId", response.data.id);
      sessionStorage.setItem("email", response.data.email);
      Swal.fire({
        title: "Welcome",
        icon: "success",
        confirmButtonText: "Continue",
      });
      return dispatch({
        type: "LOGIN_USER",
        payload: response.data,
      });
    } catch (error) {
      Swal.fire({
        title: `${error.response.data.msg}`,
        icon: "error",
        confirmButtonText: "Continue",
      });
    }
  };
}

export function testIsUser(payload) {
  return async (dispatch) => {
    try {
      console.log("action data", payload);
      const response = await axios.post(
        `https://proyecto-grupal-back-production.up.railway.app/user/isuser/${payload.email}`,
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
        `https://proyecto-grupal-back-production.up.railway.app/user/socialuser/${payload.sub}`
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
        `https://proyecto-grupal-back-production.up.railway.app/user/profile/${payload.id}`
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
        `https://proyecto-grupal-back-production.up.railway.app/user/profile/${payload.id}`,
        payload
      );
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
        `https://proyecto-grupal-back-production.up.railway.app/user/reset`,
        payload
      );
      Swal.fire({
        title: "Email sent!",
        icon: "success",
        confirmButtonText: "Continue",
      });
      localStorage.setItem("token2", response.data.token);
      localStorage.setItem("email", response.data.mail);
      console.log(response.data.mail);
      console.log(response.data.token);
    } catch (error) {
      Swal.fire({
        title: "Invalid Email",
        icon: "error",
        confirmButtonText: "Continue",
      });
    }
  };
}
export function resetConfirm(payload) {
  return async function () {
    try {
      let response = await axios.put(
        `https://proyecto-grupal-back-production.up.railway.app/user/reset/${payload.email}/${payload.token}`,
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

  return async (dispatch) => {
    try {
      const user_id = sessionStorage.getItem("userId");
      if (user_id) {
            return (dispatch) => {
          fetch("https://proyecto-grupal-back-production.up.railway.app/wishlist?user_id=" + user_id)
            .then((res) => res.json())
            .then((json) => {
              dispatch({
                type: "GET_USER_WISH_LIST",
                payload: json.wishListItems,
              });
            });
        };
      }
    } catch (error) {
      console.log(error);
    }
}
}

export function saveUserWishList(payload) {
  console.log(`Payload de action saveUserWishList: `);
  console.dir(payload);
  return async (dispatch) => {
    const response = await axios.post(
      `https://proyecto-grupal-back-production.up.railway.app/wishlist`,
      payload
    );
    return response;
  };
}

export function addProductToWishList(
  productId,
  thumbnail,
  title,
  description,
  price
) {
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
  return async function (dispatch) {
    try {
      await axios.delete(`https://proyecto-grupal-back-production.up.railway.app/orders/${id}`);
      return dispatch({
        type: "CANCELL_ORDER",
        payload: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function confirmOrder(id) {
  return async function (dispatch) {
    try {
      await axios.post(`https://proyecto-grupal-back-production.up.railway.app/orders/${id}`);
      return dispatch({
        type: "CONFIRM_ORDER",
        payload: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function shippingOrder(id) {
  return async function (dispatch) {
    try {
      await axios.put(`https://proyecto-grupal-back-production.up.railway.app/orders/shipping/${id}`);
      return dispatch({
        type: "SHIPPING_ORDER",
        payload: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function notOrder(payload) {
  return async function () {
    try {
      let response = await axios.post(
        `https://proyecto-grupal-back-production.up.railway.app/checkout/success`,
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
        `https://proyecto-grupal-back-production.up.railway.app/checkout/success/shipping/`,
        payload
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", response.data.mail);
    } catch (error) {
      console.log(error);
    }
  };
}

export function getOrdById(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`https://proyecto-grupal-back-production.up.railway.app/orders/admind/${id}`);
      return dispatch({
        type: "GET_ORDERSBYID",
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}
