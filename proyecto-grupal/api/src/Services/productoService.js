const { Product, Category } = require("../db.js");


const getAllProducts = async () => {
  const allProducts = await Product.findAll({
    include: [Category],
  });
  return allProducts;
};

const createNewProduct = async (newProduct, category) => {
  const cat = await Category.findOne({
    where: {
      name: category.name,
    },
  });
  console.log(cat);

  const productToInsert = {
    ...newProduct,
    categoryId: cat.id,
  };
  console.log(productToInsert);
  const createdProduct = await Product.create(productToInsert);

  return createdProduct;
};

const getProductById = async (id) => {
  const productById = await Product.findByPk(id, {
    include: [Category],
  });
  return productById;
};

const deleteProduct = async (id) => {
  const destroy = await Product.destroy({
    where: {
      id: id,
    },
  });
  return destroy;
};

const findProvider = async (category) => {

  const find = await Category.findOne({
    where: {
      name: category.name,
    },
  });
  return find;
};

const productUpdate = async (id, body) => {
  const prodUpdate = await Product.update(body, {
    where: {
      id: id,
    },
  });
  return prodUpdate;
};

const getLastIdProduct = async () => {
  const allId = await Product.findOne({
    order: [ [ 'id', 'DESC' ]],
    });
   

  return allId;
}

module.exports = {
  getAllProducts,
  createNewProduct,
  getProductById,
  deleteProduct,
  productUpdate,
  findProvider,
  getLastIdProduct,
};
