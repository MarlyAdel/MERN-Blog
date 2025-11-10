const asyncHandler = require("express-async-handler");
const {Category, validateCreateCategory} = require("../models/Category")


//^ Create New Category
/**---------------------------------------------------------------------------------------------------------------------------------
 * @desc Create New Category
 * @route /api/categories
 * @method POST
 * @access private (only Admin)
 ----------------------------------------------------------------------------------------------------------------------------------*/
const createNewCategoryCtrl = asyncHandler(async (req,res) => {
    const {error} = validateCreateCategory(req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message})
    }
    const category = await Category.create({
        title: req.body.title,
        user: req.user.id
    })
    res.status(201).json(category)
}) 


//^ Get All Categories
/**---------------------------------------------------------------------------------------------------------------------------------
 * @desc Get All Categories
 * @route /api/categories
 * @method GET
 * @access public
 ----------------------------------------------------------------------------------------------------------------------------------*/
const getAllCategoriesCtrl = asyncHandler(async (req,res) => {
    const categories = await Category.find();
    res.status(200).json(categories)
}) 


//^ Delete Category
/**---------------------------------------------------------------------------------------------------------------------------------
 * @desc Delete Category
 * @route /api/categories/:id
 * @method DELETE
 * @access private (only Admin)
 ----------------------------------------------------------------------------------------------------------------------------------*/
const deleteCategoryCtrl = asyncHandler(async (req,res) => {
    const category = await Category.findById(req.params.id);
    if(!category){
        return res.status(404).json({message: "Category Not Found"})
    }
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({message: "Category has been deleted", categoryId: category._id})
}) 





module.exports = {
    createNewCategoryCtrl,
    getAllCategoriesCtrl,
    deleteCategoryCtrl
}