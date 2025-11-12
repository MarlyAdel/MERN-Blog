import request from "../../Utils/request"
import { postActions } from "../Slices/PostSlice";
import { toast } from 'react-toastify';


 

//& Fetch Posts Based On Page Number
export function fetchPosts (pageNumber){
    return async (dispatch) => {
        try {
            const {data} = await request.get(`/api/posts?pageNumber=${pageNumber}`);
            dispatch(postActions.setPosts(data))
        } 
        catch (error) {
            toast.error(error.response.data.message, {theme:"colored", position:"top-center"})
        }
    }
}


//& Get Posts Based On Count
export function getPostsCount (){
    return async (dispatch) => {
        try {
            const {data} = await request.get(`/api/posts/count`);
            dispatch(postActions.setPostsCount(data))
        } 
        catch (error) {
            toast.error(error.response.data.message, {theme:"colored", position:"top-center"})
        }
    }
}


//& Fetch Posts Based On Category
export function fetchPostsBasedOnCategory (category){
    return async (dispatch) => {
        try {
            const {data} = await request.get(`/api/posts?category=${category}`);
            dispatch(postActions.setPostsCategory(data))
        } 
        catch (error) {
            toast.error(error.response.data.message, {theme:"colored", position:"top-center"})
        }
    }
}


//& Create New Post
export function createPost (newPost){
    return async (dispatch, getState) => {
        try {
            dispatch(postActions.setLoading());
            console.log("USER FROM REDUX:", getState().auth.user);
            await request.post(`/api/posts`, newPost, {
                headers: {
                    Authorization : "Bearer " + getState().auth.user.token,
                    "Content-Type" : "multipart/form-data"
                }
            });
            dispatch(postActions.setIsPostCreated());
            setTimeout(() => dispatch(postActions.clearIsPostCreated()), 2000)
        } 
        catch (error) {
            toast.error(error.response.data.message, {theme:"colored", position:"top-center"});
            dispatch(postActions.clearLoading());
        }
    }
}


//& Fetch Single Post
export function fetchSinglePost (postId){
    return async (dispatch) => {
        try {
            const {data} = await request.get(`/api/posts/${postId}`);
            dispatch(postActions.setPost(data))
        } 
        catch (error) {
            toast.error(error.response.data.message, {theme:"colored", position:"top-center"})
        }
    }
}


//& Toggle Like Post
export function toggleLikeePost (postId){
    return async (dispatch, getState) => {
        try {
            const {data} = await request.put(`/api/posts/like/${postId}`, {} , {
                headers: {
                    Authorization : "Bearer " + getState().auth.user.token
                }
            });
            dispatch(postActions.setLike(data))
        } 
        catch (error) {
            toast.error(error.response.data.message, {theme:"colored", position:"top-center"})
        }
    }
}


//& Update Post Image
export function updatePostImage (newImage , postId){
    return async (dispatch, getState) => {
        try {
            await request.put(`/api/posts/update-image/${postId}`, newImage , {
                headers: {
                    Authorization : "Bearer " + getState().auth.user.token,
                    "Content-Type" : "multipart/form-data"
                }
            });
            toast.success("New Post Image updated successfully", {theme:"colored"})
        } 
        catch (error) {
            toast.error(error.response.data.message, {theme:"colored", position:"top-center"})
        }
    }
}


//& Update Post
export function updatePost (newPost, postId){
    return async (dispatch, getState) => {
        try {
           const { data } = await request.put(`/api/posts/${postId}`, newPost , {
                headers: {
                    Authorization : "Bearer " + getState().auth.user.token,
                }
            });
            dispatch(postActions.setPost(data))
        } 
        catch (error) {
            toast.error(error.response.data.message, {theme:"colored", position:"top-center"})
        }
    }
}


//& Delete Post
export function deletePost (postId){
    return async (dispatch, getState) => {
        try {
            const { data } = await request.delete(`/api/posts/${postId}`, {
                headers: {
                    Authorization : "Bearer " + getState().auth.user.token
                }
            })
            dispatch(postActions.deletePost(data.postId));
            toast.success(data.message, {theme:'colored'});
        } 
        catch (error) {
            toast.error(error.response.data.message, {theme:'colored', position:"top-center"});
        }
    }
}


//& Get All Posts
export function getAllPosts (){
    return async (dispatch) => {
        try {
            const {data} = await request.get('/api/posts');
            dispatch(postActions.setPosts(data))
        } 
        catch (error) {
            toast.error(error.response.data.message, {theme:"colored", position:"top-center"})
        }
    }
}
