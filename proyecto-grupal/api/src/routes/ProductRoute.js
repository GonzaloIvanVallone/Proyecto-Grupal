const { Router } = require("express");
const router = Router();
const {
  getAllProducts,
  createNewProduct,
  getProductById,
  deleteProduct,
  updateProduct,
  postReviews,
  getReviews,
  deleteReview,
} = require("../Controllers/productController");
const { userAuth } = require("../Controllers/userController");

//localhost:3001/product

router.get("/", getAllProducts);
router.post("/", createNewProduct);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);
router.post("/:id/reviews", postReviews);
router.get("/:id/reviews", getReviews);
router.delete("/reviews/:id", deleteReview);

module.exports = router;
