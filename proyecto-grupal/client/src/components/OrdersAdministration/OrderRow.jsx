import { TableRow } from "@mui/material";
import React from "react";
//import { useState } from "react";
//import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../../redux/actions/productsActions";
import styles from "../UserRow/userRow.module.css";
import s from "./OrderRow.module.css";
import { TableCell } from "@mui/material";
//import {  useEffect } from "react";
import { Link } from "react-router-dom";

export default function OrderRow({
  id,
  quantity,
  status,
  price,
  user,
  orderDetail,
  orderShipping,
}) {
  const dispatch = useDispatch();
  const history = useHistory();

  function handleCancell(e) {
    e.preventDefault();
    dispatch(actions.cancellOrder(id));
  }
  function handleConfirm(e) {
    e.preventDefault();
    dispatch(actions.confirmOrder(id));
  }
  async function handleShipping(e) {
    e.preventDefault();
    await dispatch(actions.shippingOrder(id));

    orderShipping === "in process"
      ? dispatch(actions.getOrders())
      : dispatch(actions.notShippOrder({ id: id }));
    dispatch(actions.getOrders());
  }

  function handleDetailCard(id) {
    history.push(`orders/admind/${id}`);
  }

  return (
    <TableRow
      key={id}
      className={id % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}
    >
      <TableCell sx={{ color: "#e7ebf0" }}>{id}</TableCell>
      <TableCell sx={{ color: "#e7ebf0" }}>{status}</TableCell>
      <TableCell sx={{ color: "#e7ebf0" }}>{quantity}</TableCell>
      <TableCell sx={{ color: "#e7ebf0" }}>{price}</TableCell>
      <TableCell sx={{ color: "#e7ebf0" }}>{user}</TableCell>
      <TableCell sx={{ color: "#e7ebf0" }}>
      <button
          className={s.btns0}
          type="submit"
          onClick={() => handleDetailCard()}
        >
         More Details
        </button>
        {/* <Link to={`/orderDetails/${user}/${id}`}>More Details</Link> */}
      </TableCell>
      <TableCell sx={{ color: "#e7ebf0" }}>
        <button
          className={s.btns0}
          type="submit"
          onClick={(e) => handleCancell(e)}
        >
          X
        </button>
      </TableCell>
      <TableCell sx={{ color: "#e7ebf0" }}>
        <button
          className={s.btns1}
          type="submit"
          onClick={(e) => handleConfirm(e)}
        >
          &#10003;
        </button>
      </TableCell>
      <TableCell sx={{ color: "#e7ebf0" }}>
        <button
          className={s.btnsSent}
          type="submit"
          onClick={(e) => handleShipping(e)}
        >
          {orderShipping}
        </button>
      </TableCell>
    </TableRow>
  );
}
