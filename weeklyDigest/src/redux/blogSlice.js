import { createSlice } from "@reduxjs/toolkit";
const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    blogById: null,
    loading: false,
    reactions: {}
  },
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },
    setBlogById: (state, action) => {
      state.blogById = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    appendBlogs: (state, action) => {
      state.blogs = [...state.blogs, ...action.payload];
    },
    addReaction: (state, action) => {
      const {blogId, type} = action.payload;
      if(!state.reactions[blogId]){
        state.reactions[blogId] = { likes: 0, dislikes: 0};
      }
      state.reactions[blogId][type]++;
    }
  },
});
export const { setBlogs, setBlogById, setLoading, appendBlogs, addReaction } = blogSlice.actions;
export default blogSlice.reducer;
