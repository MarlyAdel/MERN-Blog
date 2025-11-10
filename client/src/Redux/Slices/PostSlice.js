import { createSlice } from "@reduxjs/toolkit";


const PostSlice = createSlice({
    name: "post",
    initialState: {
       posts: [],
       postsCount: null,
       postsCategory: [],
       loading: false,
       isPostCreated: false,
       post:null
    },
    reducers: {
       setPosts(state , action){
        state.posts = action.payload;
       },
       setPostsCount(state , action){
        state.postsCount = action.payload;
       },
       setPostsCategory(state , action){
        state.postsCategory = action.payload;
       },
       // Create New Post
       setLoading(state){
        state.loading = true;
       },
       clearLoading(state){
        state.loading = false;
       },
       setIsPostCreated(state){
        state.isPostCreated = true;
        state.loading = false;
       },
       clearIsPostCreated(state){
        state.isPostCreated = false;
      },
      // Post Details
      setPost(state , action){
         state.post = action.payload;
      },
      // Likes
      setLike(state, action){
         state.post.likes = action.payload.likes; 
      },
      // Delete Post
      deletePost(state , action){
         state.posts = state.posts.filter(post => post._id !== action.payload);
      },
      // Create Comment
      addCommentToPost(state, action){
         state.post.comments.push(action.payload);
      },
      // Update Comment
      updateCommentPost(state,action){
         state.post.comments = state.post.comments.map(comment => 
            comment._id === action.payload._id ? action.payload : comment
         )
      },
      // Delete Comment
      deleteCommentFromPost(state , action){
         const comment = state.post.comments.find(c => c._id === action.payload);
         const commentIndex = state.post.comments.indexOf(comment);

         state.post.comments.splice(commentIndex, 1);
      }
    }
})


const postReducer = PostSlice.reducer;
const postActions = PostSlice.actions;

export {postReducer , postActions}