
import { createSlice } from '@reduxjs/toolkit';


const PasswordSlice = createSlice({
    name: "password",
    initialState: {
       isError: false
    },
    reducers: {
      setError(state){
        state.isError = true;
      },
    }

})


const passwordReducer = PasswordSlice.reducer;
const passwordActions = PasswordSlice.actions;

export { passwordReducer , passwordActions }