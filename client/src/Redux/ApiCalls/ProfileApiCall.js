import request from "../../Utils/request"
import { authActions } from "../Slices/AuthSlice";
import { profileActions } from "../Slices/ProfileSlice";
import { toast } from "react-toastify";




//& Get User Profile
export function getUserProfile(userId){
    return async(dispatch) => {
        try {
            const {data} = await request.get(`/api/users/profile/${userId}`);
            dispatch(profileActions.setProfile(data));
        } 
        catch (error) {
           toast.error(error.respone?.data?.message, {theme:"colored", position:"top-center"}) 
        }
    }
}


//& Upload Profile Photo
export function uploadProfilePhoto(newPhoto){
    return async(dispatch,getState) => {
        try {
            const {data} = await request.post(`/api/users/profile/profile-photo-upload`, newPhoto, {
                headers: {
                    Authorization : "Bearer " + getState().auth.user.token,
                    "Content-Type" : "multipart/form-data"
                }
            })
            dispatch(profileActions.setProfilePhoto(data.profilePhoto)); // update the profile photo
            dispatch(authActions.setUserPhoto(data.profilePhoto)); // update the photo in authSlice
            toast.success(data.message, {theme:"colored", position:"top-center"});

            // Modify the User in localStorage with new Photo
            const user = JSON.parse(localStorage.getItem("userInfo"));
            user.profilePhoto = data?.profilePhoto;
            localStorage.setItem("userInfo", JSON.stringify(user));

        } 
        catch (error) {
           toast.error(error.response.data.message, {theme:"colored", position:"top-center"}) 
        }
    }
}


//& Update Profile
export function updateProfile(userId,profile){
    return async(dispatch,getState) => {
        try {
            const {data} = await request.put(`/api/users/profile/${userId}`, profile, {
                headers: {
                    Authorization : "Bearer " + getState().auth.user.token
                }
            })
            dispatch(profileActions.updateProfile(data));
            dispatch(authActions.setUserName(data.username));

            // Modify the User in localStorage with new username
            const user = JSON.parse(localStorage.getItem("userInfo"));
            user.username = data?.username;
            localStorage.setItem("userInfo", JSON.stringify(user));

        } 
        catch (error) {
            toast.error(error.response.data.message, {theme:"colored", position:"top-center"});
        }
    }
}


//& Delete Profile (Account)
export function deleteProfile(userId){
    return async(dispatch, getState) => {
        try {
            dispatch(profileActions.setLoading());
            const { data } = await request.delete(`/api/users/profile/${userId}`, {
                headers: {
                    Authorization : "Bearer " + getState().auth.user.token
                }
            })
            dispatch(profileActions.setIsProfileDeleted());
            toast.success(data?.message, {theme:"colored", position:"top-center"});
            setTimeout(() => {
                dispatch(profileActions.clearIsProfileDeleted())
            },2000)
        } 
        catch (error) {
            toast.error(error.response.data.message, {theme:"colored", position:"top-center"});
            dispatch(profileActions.clearLoading());
        }
    }
}


//& Get Users Count  {For Admin Dashboard}
export function getUsersCount(){
    return async(dispatch,getState) => {
        try {
            const { data } = await request.get("/api/users/count", {
                headers: {
                    Authorization : "Bearer " + getState().auth.user.token
                }
            })
            dispatch(profileActions.setUserCount(data));

        } 
        catch (error) {
            toast.error(error.response.data.message, {theme:"colored", position:"top-center"});
        }
    }
}


//& Get All Users Profile  {For Admin Dashboard}
export function getAllUsersProfile(){
    return async(dispatch,getState) => {
        try {
            const { data } = await request.get("/api/users/profile", {
                headers: {
                    Authorization : "Bearer " + getState().auth.user.token
                }
            })
            dispatch(profileActions.setProfiles(data));

        } 
        catch (error) {
            toast.error(error.response.data.message, {theme:"colored", position:"top-center"});
        }
    }
}