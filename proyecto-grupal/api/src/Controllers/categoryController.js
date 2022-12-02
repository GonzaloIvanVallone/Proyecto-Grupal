const categoryServices = require("../Services/categoryService");
const { Product, Category } = require("../db.js");
const axios = require("axios");

const getAllCategories = async (req, res, next) => {
  const { name } = req.query;

  try {
    if (name) {
      const allCategories = await categoryServices.getAllCategories();
      res
        .status(200)
        .send(
          allCategories.filter((e) =>
            e.name.toLowerCase().includes(name.toLowerCase())
          )
        );
    } else {
      const allCategories = await categoryServices.getAllCategories();
      res.status(200).send(allCategories);
    }
  } catch (error) {
    next(error);
  }
};

const createNewCategory = async (req, res, next) => {
  const { body } = req;
  let id = await categoryServices.getLastIdCategory();
  try {
    const newCategory = {
      id: ++id.dataValues.id,
      name: body.name,
    };
    const createdCategory = await categoryServices.createNewCategory(
      newCategory
    );
    if (createdCategory) {
      res.status(201).send("Category Created!");
    } else {
      res.status(404).send("Error creating Category!");
    }
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const categoryById = await categoryServices.getCategoryById(id);
    if (categoryById) {
      res.status(200).send(categoryById);
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await categoryServices.getCategoryById(id);
    if (!category) {
      return res.status(404).send("Category not found...");
    }
    const destroy = await categoryServices.deleteCategory(id);
    if (destroy) {
      const newlist = await categoryServices.getAllCategories();
      res.status(200).send(newlist);
    } else {
      res.status(404).send("Error");
    }
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const update = await categoryServices.updateCategory(body, id);
    if (update) {
      const newListCat = await categoryServices.getAllCategories();
      res.status(200).send(newListCat);
    } else {
      res.status(404).send("Error");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategories,
  createNewCategory,
  getCategoryById,
  deleteCategory,
  updateCategory
};
