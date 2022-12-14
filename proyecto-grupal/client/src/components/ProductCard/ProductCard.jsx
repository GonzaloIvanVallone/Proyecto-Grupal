import { Button } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addCart, addProductToWishList, saveUserWishList, removeProductFromWishList, getUserWishList } from "../../redux/actions/productsActions";
import sty from "..//ProductCard/ProductCard.module.css";
import Swal from "sweetalert2";
import { useEffect } from "react";

export default function ProductCard({
  title,
  id,
  price,
  images,
  rating,
  stock,
  description,
}) {
  const history = useHistory();
  const dispatch = useDispatch();
  let cart = useSelector((state) => state.cart);
  let userDb = useSelector((state) => state.user);
  let wishList = useSelector((state) => state.wishListItems);

  useEffect(() => {
    dispatch(getUserWishList());
}, [dispatch]);

  function handleClickCard() {
    history.push(`/details/${id}`);
  }

  function handleWishList() {
    const data = wishList?.find(item => {
      return item.id === id;
    });
    console.log('data de handleWishList: ', data);
    if(!data) {
      console.log('entra al if(!data)');
      dispatch(addProductToWishList(id, images, title, description, price));
      const objWishListItem = {
        id: id,
        thumbnail: images,
        title: title,
        description: description,
        price: price
      }
      const objWishList = {
        user_id: sessionStorage.getItem("userId"),
        wishListItems: [
          ...wishList,
          objWishListItem
        ]
      }
      console.log('objWishList.wishListItems: ', objWishList.wishListItems);
      dispatch(saveUserWishList(objWishList));
    }
  }
  function handleWishListDelete() {
    console.log('entra a handleWishListDelete. El id es: ' + id);
    console.log('la wishList es: ', wishList);
    const data = wishList?.find(item => {
      return item.id === id;
    });
    console.log('la data de handleWishListDelete es: ', data);
    if(data) {
      dispatch(removeProductFromWishList(data.id));
      const objWishList = {
        user_id: sessionStorage.getItem("userId"),
        wishListItems: wishList.filter(wishListItem => {
          return (wishListItem.id !== data.id)
        })
      }
      dispatch(saveUserWishList(objWishList));
    }
  }
  function showWishListButtons() {
    if(sessionStorage.getItem("userId")!==null) {
      return true;
    } else {
      return false;
    }
  }
  function handleCart() {
    const data = cart?.filter((item) => item.productId === id);
    const dataf = data.length < 1 ? stock - 1 : data[0].quantity;
    //console.log(dataf);
    stock > 0 && dataf + 1 <= stock
      ? dispatch(addCart(id, price, images, title))
      : Swal.fire({
        title: 'Out of Stock!',
        //text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'Continue'
      });
  }
  //const dark = useSelector((state) => state.dark);
  function checkIsInWishList(id) {
    const wishListItemFound = wishList.find(wishListItem => {
      return wishListItem.id === id;
    });
    return wishListItemFound? true: false;
  }
  return (
    <>
      <div>
        <div onClick={handleClickCard} className={sty.card}>
          <img className={sty.images} src={images} alt="" />

          <div className={sty.text}>
            <strong>{title}</strong>
            <p className={sty.weight}>
              <strong>Price: $ </strong>
              {price ? price : "0"}
            </p>
            <div className={sty.ratingbox}>
              <p className={sty.weight}>
                <strong>Rating: </strong>
                {rating ? rating : "0"}
              </p>
              {rating > 0 ? (
                <div className={sty.stars}>
                  <div
                    className={sty.percent}
                    style={{ width: `${((rating * 100) / 10) * 2}%` }}
                  ></div>
                </div>
              ) : (
                <div className={sty.stars}>
                  <div className={sty.percent} style={{ width: `${0}%` }}></div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={sty.divBtns}>
        {stock ? (
          <Button
            style={{ width: "70%" }}
            variant="contained"
            size="small"
            onClick={handleCart}
          >
            Add to Cart
          </Button>
        ) : (
          <Button style={{ width: "70%" }} variant="contained" size="small">
            Not Available
          </Button>
        )}
        {
          (showWishListButtons()) && (
          (checkIsInWishList(id)) ? <Button
          style={{ width: "70%" }}
          variant="contained"
          size="small"
          onClick={handleWishListDelete}
        >
          Remove from wishlist
        </Button> : <Button
            style={{ width: "70%" }}
            variant="contained"
            size="small"
            onClick={handleWishList}
          >
            Add to wishlist
          </Button>
          )
        }
        </div>
          
      </div>
    </>
  );
}
