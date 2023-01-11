import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions/productsActions";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Rating from "@mui/material/Rating";

const useStyles = makeStyles({
  root: {
    width: 200,
    display: "flex",
    alignItems: "center",
  },
  image: {
    marginRight: "20px",
  },
  title: {
    fontSize: 14,
  },
});

export default function Reviews({ productId }) {
  const classes = useStyles();
  const reviews = useSelector((state) => state.reviews);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getReviews(productId));
  }, [dispatch, productId]);

  return (
    <div>
      {reviews.length === 0 ? (
        <p>There are no reviews yet</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} className={classes.root}>
            <img
              className={classes.image}
              src={review.image}
              alt={review.userId.username}
            />
            <div>
              <div className={classes.title}>{review.userId.username}</div>
              <Rating value={review.rating} readOnly />
              <p>{review.comment}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
