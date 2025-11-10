import request from "../../Utils/request";
import { commentActions } from "../Slices/CommentSlice";
import { postActions } from "../Slices/PostSlice";
import { toast } from 'react-toastify';



//& Create Comment
export function createComment(newComment){
    return async(dispatch, getState) => {
        try {
            const { data } = await request.post("/api/comments", newComment, {
                headers: {
                    Authorization : "Bearer " + getState().auth.user.token
                }
            })
            dispatch(postActions.addCommentToPost(data))
        } 
        catch (error) {
            toast.error(error.response.data.message, {theme:"colored", position:"top-center"})
        }
    }
}


//& Update Comment
export function updateComment(commentId, comment){
    return async(dispatch, getState) => {
        try {
          const { data } = await request.put(`/api/comments/${commentId}`, comment, {
            headers: {
                Authorization : "Bearer " + getState().auth.user.token
            }
          })  
           dispatch(postActions.updateCommentPost(data))
        } 
        catch (error) {
            toast.error(error.response.data.message, {theme:"colored", position:"top-center"});
        }
    }
}


//& Delete Comment
export function deleteCommnet(commentId){
    return async(dispatch, getState) => {
        try {
            await request.delete(`/api/comments/${commentId}`, {
                headers: {
                    Authorization : "Bearer " + getState().auth.user.token
                }
            })
            dispatch(commentActions.deleteComment(commentId));
            dispatch(postActions.deleteCommentFromPost(commentId));
            
        } 
        catch (error) {
           toast.error(error.response.data.message, {theme:"colored", position:"top-center"});  
        }
    }
}


//& Get All Comments
export function getAllComments(){
    return async(dispatch,getState) => {
        try {
            const { data } = await request.get("/api/comments", {
            headers: {
                Authorization : "Bearer " + getState().auth.user.token
            }
        })
        dispatch(commentActions.setComments(data))
        } 
        catch (error) {
            toast.error(error.response.data.message, {theme:"colored", position:"top-center"}); 
        }
    }
}