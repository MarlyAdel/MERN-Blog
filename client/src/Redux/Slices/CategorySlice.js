
import { createSlice } from '@reduxjs/toolkit';


const CategorySlice = createSlice({
    name: "category",
    initialState: {
       categories: [],
    },
    reducers: {
      // Get All Categories
       setCategories(state,action){
        state.categories = action.payload;
      },
      // Add Category
      addCategory(state, action){
         state.categories.push(action.payload);
      },
      // Delete Category
      deleteCategory(state, action){
         state.categories = state.categories.filter(c => c._id !== action.payload);
      }
    }

})


const categoryReducer = CategorySlice.reducer;
const categoryActions = CategorySlice.actions;

export { categoryReducer , categoryActions }