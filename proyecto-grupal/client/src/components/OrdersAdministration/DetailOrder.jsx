import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@mui/material/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "@material-ui/core";
import * as actions from "../../redux/actions/productsActions";
import s from "./OrderDetail.module.css";
import logo from "..//../img/logo.JPG";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    direction: "row",
    justifyContent: "center",
    marginTop: 5,
  },
  detail: {
    direction: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    display: "flex",
    direction: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: "2px",
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  card: {
    width: 400,
    height: 800,
  },
  typo: {
    fontfamily: "Poppins",
    fontSize: 30,
    display: "flex",
    justifyContent: "center",
  },
  paragraph: {
    margin: "10px 0",
  },
  image: {
    width: "50px",
    height: "50px",
  },
  trade: {
    display: "flex",
    direction: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: "5px",
  },
  tradeName: {
    fontfamily: "Poppins",
    fontSize: 25,
  },
}));

export default function DetailOrder({ id }) {
  const orders = useSelector((state) => state.detailOrder.OrderDetails);
  const detailOrders = useSelector((state) => state.detailOrder);
  console.log(detailOrders);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  let data = window.location.toString().split("/");

  useEffect(() => {
    dispatch(actions.getOrdById(id));
  }, [dispatch]);

  function handleClickBack() {
    history.push("/administrateOrders");
  }

  return (
    <div>
      <Grid>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={handleClickBack}
        >
          Go back!
        </Button>
        <Grid>
          {!detailOrders ? (
            "No Detail"
          ) : (
            <>
              <Typography variant="body1" color="initial">
                Order
              </Typography>
              <Typography variant="body1" color="initial">
                ID Mercado pago:{detailOrders.idMp}
              </Typography>
              <Typography variant="body1" color="initial">
                Price:{detailOrders.price}
              </Typography>
              <Typography variant="body1" color="initial">
                Quantity:{detailOrders.quantity}
              </Typography>
            </>
          )}
        </Grid>

        {orders.length === 0 ? (
          <Typography variant="body1" color="initial">
            no order details
          </Typography>
        ) : (
          orders.map((order) => (
            <>
              <img
                src={order.product.thumbnail}
                alt={order.product.title}
                width="200"
                height="200"
                alignItems="center"
              />
              <Typography color="textSecondary">
                Title: {order.product.title}
              </Typography>
              <Typography color="textSecondary">
                Quantity: {order.quantity}
              </Typography>
              <Typography color="textSecondary">
                Price: {order.product.price}
              </Typography>
            </>
          ))
        )}
      </Grid>
    </div>
  );
}
