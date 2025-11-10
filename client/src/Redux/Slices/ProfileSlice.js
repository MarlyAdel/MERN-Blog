
import { createSlice } from '@reduxjs/toolkit';


const ProfileSlice = createSlice({
    name: "profile",
    initialState: {
        profile: null,
        loading: false,
        isProfileDeleted: false,
        usersCount: null,
        profiles: [],
    },
    reducers: {
        setProfile(state , action){
            state.profile = action.payload;
        },
        setProfilePhoto(state , action){
            state.profile.profilePhoto = action.payload;
        },
        updateProfile(state , action){
            state.profile = action.payload;
        },
        // Loading
        setLoading(state){
            state.loading = true;
        },
        clearLoading(state){
            state.loading = false;
        },
        // Delete Profile
        setIsProfileDeleted(state){
            state.isProfileDeleted = true;
            state.loading = false;
        },
        clearIsProfileDeleted(state){
            state.isProfileDeleted = false;
        },
        // User Count
        setUserCount(state, action){
            state.usersCount = action.payload;
        },
        //Profiles
        setProfiles(state, action){
            state.profiles = action.payload;
        }
    }
})


const profileReducer = ProfileSlice.reducer;
const profileActions = ProfileSlice.actions;

export {profileReducer , profileActions}