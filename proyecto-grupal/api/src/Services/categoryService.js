const { Product, Category } = require("../db.js");


const getAllCategories = async () => {
  const allCategories = await Category.findAll({
    include: [Product],
  });
  return allCategories;
};

const createNewCategory = async (newCategory) => {
  const createdCategory = await Category.create(newCategory);

  return createdCategory;

};
const getLastIdCategory = async () => {
  const allId = await Category.findOne({
    order: [ [ 'id', 'DESC' ]],
    });
   

  return allId;
}


const getCategoryById = async (id) => {
  const categoryById = await Category.findByPk(id);
  return categoryById;
};

const deleteCategory = async (id) => {
  const destroy = await Category.destroy({
    where: {
      id: id,
    },
  });
  return destroy;
};

const updateCategory = async (body, id) => {
  const update = await Category.update(body, {
    where: {
      id: id,
    },
  });
  return update;
};


module.exports={
    getAllCategories,
    createNewCategory,
    getLastIdCategory,
    getCategoryById,
    deleteCategory,
    updateCategory
}