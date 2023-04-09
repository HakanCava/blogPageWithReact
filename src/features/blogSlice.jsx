import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    title: "",
    content: "",
    image: "",
    blogs: [],
    blog:null,
    userBlogs:[],
    categories: null,
    status: "",
    comments: 0,
    likes: 0,
    loading: false,
    error: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getSuccess: (state, { payload: { data, url } }) => {
      state.loading = false;
      state[url] = data;
    },
    getBlogDetailSuccess: (state, { payload }) => {
      state.loading = false;
      state.userBlogs = payload;
    },
    logoutBlogSuccess: (state) => {
      state.loading = false;
      state.error = false;
      state.title = "";
      state.content = "";
      state.image = "";
      state.userBlogs=[];
      state.blog=null;
      state.categories = null;
      state.status = "";
      state.comments = "";
      state.likes = "";
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, getSuccess, fetchFail, logoutBlogSuccess,getBlogDetailSuccess } =
  blogSlice.actions;
export default blogSlice.reducer;
