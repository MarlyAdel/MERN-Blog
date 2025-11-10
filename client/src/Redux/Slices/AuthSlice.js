import { createSlice } from "@reduxjs/toolkit"


const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        user: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null ,
        registerMessage: null,
        isEmailVerified: false,
    },
    reducers: {
        // Register & Login & Logout
        login(state, action){
            state.user = action.payload;
            state.registerMessage = null;
        },
        logout(state){
            state.user = null;
        },
        register(state, action){
            state.registerMessage = action.payload;
        },
        clearRegisterMessage(state) {
            state.registerMessage = null;
        },
        // Profile
        setUserPhoto(state , action){
            state.user.profilePhoto = action.payload;
        },
        setUserName(state , action){
            state.user.username = action.payload;
        },
        // Verify Email
        setIsEmailVerified(state){
            state.isEmailVerified = true;
            state.registerMessage = null;
        }
    }
})


const authReducer = AuthSlice.reducer;
const authActions = AuthSlice.actions;

export {authReducer , authActions}