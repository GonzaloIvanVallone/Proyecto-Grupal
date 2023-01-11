import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@mui/material/Rating";
import TextField from "@material-ui/core/TextField";
import { Button, Grid, Typography } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import SendIcon from "@mui/icons-material/Send";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import * as actions from "../../redux/actions/productsActions";
import Swal from "sweetalert2";
import s from "./ReviewForm.module.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

export default function ReviewForm({ productId, orderId, userId }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);
  const [formVisible, setFormVisible] = useState(true);
  const [formData, setFormData] = useState({
    productId: "",
    orderId: "",
    comment: "",
    rating: "",
    image: null,
  });
  const [errors, setErrors] = useState({});
  //const [commentError, setCommentError] = useState("");

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  useEffect(() => {
    console.log(productId, orderId, userId);
  }, [productId, orderId, userId]);

  useEffect(() => {
    console.log("formData: ", formData);
    console.log("errors: ", errors);
    console.log("rating: ", rating);
    console.log("comment: ", comment);
    console.log("image: ", image);
  }, [formData, errors, rating, comment, image]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate(formData);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log(orderId, productId, userId, rating, comment, image);
      setFormData({
        ...formData,
        productId: { productId },
        orderId: { orderId },
      });
      console.log(formData);
      dispatch(
        actions.postReview(orderId, productId, userId, rating, comment, image)
      );

      setFormVisible(false);

      Swal.fire({
        title: "Review created!",
        icon: "success",
        confirmButtonText: "Continue",
      });
    }
  };

  const handleCommentChange = (e) => {
    if (e.target.value === "") {
      setErrors({ ...errors, comment: "Comment section must not be empty" });
    } else {
      setErrors({ ...errors, comment: "" });
    }
    setFormData({ ...formData, comment: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.value });
  };

  const handleRatingChange = (e) => {
    setFormData({ ...formData, rating: e.target.value });
  };

  /*const handleCloseForm = (e) => {
    setFormVisible(false);
  };*/

  function validate(formData) {
    let errors = {};
    if (isNaN(parseFloat(formData.rating).toFixed(2))) {
      errors.rating = "Please rate the product";
    }
    return errors;
  }

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className={s.formContainer}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Create a review</Typography>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" spacing={2}>
            <Item>Order ID: {orderId}</Item>
            <Item>Product ID: {productId}</Item>
            <Item>User ID: {userId}</Item>
          </Stack>
          <br />
          <TextField
            fullWidth
            id="comment"
            label="Add your review"
            type="text"
            multiline
            maxRows={4}
            variant="outlined"
            value={formData.comment}
            onChange={handleCommentChange}
            error={errors.comment}
            helperText={errors.comment}
          />
          <br />
          <br />
          <Rating
            name="rating"
            precision={0.1}
            value={formData.rating}
            onChange={handleRatingChange}
            size="large"
          />
          {errors.rating && (
            <Typography color="error">{errors.rating}</Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body">
            If you want, you can upload an image:
          </Typography>
          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleImageChange}
              />
              <PhotoCamera />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
      <Button variant="contained" endIcon={<SendIcon />} type="submit">
        Send your review
      </Button>
    </form>
  );
}
