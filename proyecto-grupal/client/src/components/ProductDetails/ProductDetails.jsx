import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
//import Loading from '..//Loading/Loading.jsx';
import {
  getProductsDetails,
  addCart,
} from "..//../redux/actions/productsActions.js";
import sty from "./ProductDetails.module.css";
import CarouselImg from "../CarouselImg/CarouselImg";
import logo from "..//../img/logo.JPG";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  // redux states --------------------------------
  const prod = useSelector((state) => state.detail);
  let cart = useSelector((state) => state.cart);
  let userDb = useSelector((state) => state.user);
  console.log(prod);
  //const dark = useSelector(state=>state.dark)

  useEffect(() => {
    dispatch(getProductsDetails(id));
  }, [id, dispatch]);

  //--------handler click--------------------
  function handleClickCreate() {
    history.push(`/modifyProduct/${id}`);
  }
  function handleClickBack() {
    history.push("/home");
  }

  function handleCart() {
    const data = cart?.filter((item) => item.productId === id);
    const dataf = data.length < 1 ? prod.stock - 1 : data[0].quantity;
    console.log(dataf);
    prod.stock > 0 && dataf + 1 <= prod.stock
      ? dispatch(addCart(id, prod.price, prod.images, prod.title))
      : alert("no");
    history.goBack();
  }

  return (
    <div className={sty.details}>
      <div className={sty.header}>
        <img src={logo} alt="LOGO" className={sty.logo} />
        <h4>CloudyBuy</h4>

        <div className={sty.btn}>
          <button onClick={handleClickBack}>
            <i className="fa-solid fa-circle-chevron-left"></i>
          </button>
          <br></br>
        </div>
      </div>

      {prod.message ? (
        <h2>{prod.message}</h2>
      ) : (
        <>
          {prod.thumbnail ? (
            <div className={sty.container}>
              {/* <img src={prod.thumbnail} alt="" />  */}
              <div className={sty.containerCarouse}>
                <div className={sty.carouse}>
                  <CarouselImg />
                </div>
              </div>

              <div className={sty.text}>
                <h1>{prod.title}</h1>
                <br />
                <div className={sty.specs}>
                  <p>
                    <strong>
                      <h4>{prod?.brand}</h4>
                    </strong>
                  </p>
                  <p>
                    <strong>
                      <h5>{prod?.description}</h5>
                    </strong>
                  </p>
                  <p className={sty.price}>
                    <strong>$ {prod?.price} </strong>
                  </p>
                </div>

                <div className={sty.ratingbox}>
                  <p className={sty.weight}>
                    <strong>Rating: </strong>
                    {prod.rating ? prod.rating : "0"}
                  </p>
                  {prod.rating > 0 ? (
                    <div className={sty.stars}>
                      <div
                        className={sty.percent}
                        style={{ width: `${((prod.rating * 100) / 10) * 2}%` }}
                      ></div>
                    </div>
                  ) : (
                    <div className={sty.stars}>
                      <div
                        className={sty.percent}
                        style={{ width: `${0}%` }}
                      ></div>
                    </div>
                  )}
                </div>

                <div>
                  {userDb.isAdmin && (
                    <button onClick={handleClickCreate} className={sty.button1}>
                      <i className="fa-solid fa-plus"></i> Modify product
                    </button>
                  )}
                </div>
              </div>

              <div className={sty.text}>
                <h1>Buy Now!</h1>
                <br />
                <div className={sty.specs}>
                  <h4 htmlFor="">
                    <strong>Actual Stock</strong>
                  </h4>
                  <p>
                    <strong>{prod.stock ? prod.stock : "0"} Und.</strong>
                  </p>
                  <br />
                  <button className={sty.btns} onClick={() => handleCart()}>
                    Add to car
                  </button>
                  <hr />
                  <button className={sty.btns} onClick={() => history.goBack()}>
                    Go to Store
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p></p>
          )}
        </>
      )}
    </div>
  );
}
