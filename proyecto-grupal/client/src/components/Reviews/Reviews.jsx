import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getReviews } from "../../redux/actions/productsActions";
import { Typography, Box } from "@material-ui/core";
import Rating from "@mui/material/Rating";

export default function Reviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviews(productId)).then((reviews) => {
      setReviews(reviews);
    });
  }, [productId, dispatch]);

  return (
    <div>
      {reviews?.map((review) => (
        <Box mb={2}>
          <br />
          <Typography>{review.comment}</Typography>
          <Rating name="read-only" value={review.rating} readOnly />
          <hr />
        </Box>
      ))}
    </div>
  );
}
