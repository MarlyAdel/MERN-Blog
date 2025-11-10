

import request from "../../Utils/request";
import { categoryActions } from "../Slices/CategorySlice"
import { toast } from 'react-toastify';


//& Fetch All Categories
export function fetchAllCategories(){
    return async(dispatch) => {
       try {
         const { data } = await request.get("/api/categories")

         dispatch(categoryActions.setCategories(data))
       } 
       catch (error) {
        toast.error(error.response.data.message, {theme:'colored', position:"top-center"})
       }
    }
}


//& Create Category
export function createCategory(newCategory){
  return async(dispatch,getState) => {
    try {
      const { data }= await request.post("/api/categories", newCategory, {
        headers: {
          Authorization : "Bearer " +  getState().auth.user.token
        }
      })
      dispatch(categoryActions.addCategory(data));
      toast.success("Category Created Successfully", {theme: "colored", position:"top-center"});
    } 
    catch (error) {
      toast.error(error.reaponse.data.message, {theme:"colored", position:"top-center"});
    }
  }
}


//& Delete Category
export function deleteCategory(categoryId){
  return async(dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/categories/${categoryId}`,{
        headers: {
          Authorization : "Bearer " + getState().auth.user.token
        }
      })
      dispatch(categoryActions.deleteCategory(data.categoryId));
      toast.success(data.message);
    } 
    catch (error) {
      toast.error(error.reaponse.data.message, {theme:"colored", position:"top-center"});
    }
  } 
}