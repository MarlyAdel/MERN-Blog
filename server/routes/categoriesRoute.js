
const express = require("express");
const router = express.Router();
const {verifyToken} = require("../middlewares/verifyToken");
const { createNewCategoryCtrl, getAllCategoriesCtrl, deleteCategoryCtrl } = require("../controllers/categoriesController");
const validateObjectId = require("../middlewares/validateObjectId")



//* Create New Category
// /api/categories
router.route("/")
      .post(verifyToken , createNewCategoryCtrl)


//* Get All Categories
// /api/categories
router.route("/")
      .get(getAllCategoriesCtrl)


//* Delete Category
// /api/categories/:id
router.route("/:id")
      .delete(validateObjectId, verifyToken, deleteCategoryCtrl)





module.exports = router ;