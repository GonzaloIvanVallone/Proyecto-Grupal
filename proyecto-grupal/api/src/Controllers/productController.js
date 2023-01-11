const productServices = require("../Services/productoService");
const { Product, Category, Review } = require("../db.js");
const axios = require("axios");

const getAllProducts = async (req, res, next) => {
  const { name } = req.query;

  try {
    if (name) {
      const allProducts = await productServices.getAllProducts();
      res
        .status(200)
        .send(
          allProducts.filter((e) =>
            e.title.toLowerCase().includes(name.toLowerCase())
          )
        );
    } else {
      const allProducts = await productServices.getAllProducts();
      res.status(200).send(allProducts);
    }
  } catch (error) {
    next(error);
  }
};

const createNewProduct = async (req, res, next) => {
  const { body } = req;
  let id = await productServices.getLastIdProduct();

  try {
    const newItemProduct = {
      id: ++id.dataValues.id,
      title: body.title,
      description: body.description,
      price: body.price,
      rating: body.rating,
      stock: body.stock,
      brand: body.brand,

      thumbnail: body.thumbnail,
      images: body.images,
    };

    const category = body.categories;

    const createProduct = await productServices.createNewProduct(
      newItemProduct,
      category
    );

    if (createProduct) {
      const newListProd = await productServices.getAllProducts();
      res.status(201).send(newListProd);
    }
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const productById = await productServices.getProductById(id);
    if (productById) {
      res.status(200).send(productById);
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await productServices.getProductById(id);
    if (!product) {
      return res.status(404).send("Product not found...");
    }
    const destroy = await productServices.deleteProduct(id);
    if (destroy) {
      const newlist = await productServices.getAllProducts();
      res.status(200).send(newlist);
    } else {
      res.status(404).send("Error");
    }
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const product = await productServices.getProductById(id);

    const cat = await productServices.findCategory(body.categories);

    !product
      ? res.status(404).send("Product not found...")
      : !cat
      ? res.status(404).send("Category not found...")
      : null;

    const updateProd = await productServices.productUpdate(id, {
      ...body,
    });
    await product.setCategories(cat);

    if (updateProd) {
      const newListProd = await productServices.getAllProducts();
      return res.status(200).send(newListProd);
    }
  } catch (error) {
    next(error);
  }
};

const postReview = (reviewData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `http://localhost:3001/product/${reviewData.productId}/reviews`,
      reviewData
    );
    dispatch({ type: "POST_REVIEW", payload: data });
  } catch (error) {
    console.error(error);
  }
};

const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      where: {
        productId: req.params.id,
      },
    });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(404).json({ message: "There is no reviews to show", data: err });
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const result = await Review.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (result === 0) {
      res.status(404).json({ message: "Review not found" });
    } else {
      res.status(200).json({ message: "Review deleted successfully" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  createNewProduct,
  getProductById,
  deleteProduct,
  updateProduct,
  postReviews,
  getReviews,
  deleteReview,
};
