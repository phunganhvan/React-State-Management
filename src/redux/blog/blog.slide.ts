import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
export const fetchListBlogs = createAsyncThunk(
  'blogs/fetchListBlogs',
  async () => {
    // userId: number, thunkAPI
    const res = await fetch("http://localhost:8000/blogs");
    const data = await res.json();
    return data;
  }
)
export const createNewBlog = createAsyncThunk(
  'blogs/createNewBlog',
  async (blogData: Omit<IBlog, 'id'>, thunkAPI) => {
    // console.log(blogData);
    const res = await fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: blogData.title,
        author: blogData.author,
        content: blogData.content
      })
    });
    const data = await res.json();
    // console.log(">>> check data create: ", data);
    if (data && data.id) {
      thunkAPI.dispatch(fetchListBlogs());
      // console.log(">>> check data create: ", data);
    }
    return data;
  }
)
export const updateBlog = createAsyncThunk(
  'blogs/updateBlog',
  async (blogData: Partial<IBlog> & { id: number }, thunkAPI) => {
    // console.log(blogData);
    const res = await fetch(`http://localhost:8000/blogs/${blogData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: blogData.title,
        author: blogData.author,
        content: blogData.content
      })
    });
    const data = await res.json();
    // console.log(">>> check data create: ", data);
    if (data && data.id) {
      thunkAPI.dispatch(fetchListBlogs());
      // console.log(">>> check data create: ", data);
    }
    return data;
  }
)
export const deleteBlog = createAsyncThunk(
  'blogs/deleteBlog',
  async (blogData: Partial<IBlog> & { id: number }, thunkAPI) => {
    // console.log(blogData);
    const res = await fetch(`http://localhost:8000/blogs/${blogData.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    });
    const data = await res.json();
    // console.log(">>> check data create: ", data);
    thunkAPI.dispatch(fetchListBlogs());
    return data;
  }
)
interface IBlog {
  id: number;
  title: string;
  author: string;
  content: string;
}
const initialState: {
  listBlogs: IBlog[];
  isCreateBlogSuccess: boolean;
  isUpdateBlogSuccess: boolean;
  isDeleteBlogSuccess: boolean;
} = {
  listBlogs: [],
  isCreateBlogSuccess: false,
  isUpdateBlogSuccess: false,
  isDeleteBlogSuccess: false,
}

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    resetCreate(state) {
      state.isCreateBlogSuccess = false;
    },
    resetUpdate(state) {
      state.isUpdateBlogSuccess = false;
    },
    resetDelete(state) {
      state.isDeleteBlogSuccess = false;
    }

  },
  extraReducers: (builder) => {
    // add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchListBlogs.fulfilled, (state, action) => {
      // Add blog to the state array
      // console.log(action.payload);
      state.listBlogs = action.payload;

    })
      .addCase(createNewBlog.fulfilled, (state) => {
        // Add blog to the state array
        // console.log(action.payload);
        // state.listBlogs = [...state.listBlogs, action.payload];
        state.isCreateBlogSuccess = true;
      })
      .addCase(updateBlog.fulfilled, (state) => {
        // we can add action in () but don't use so i remove it
        // Add blog to the state array
        // console.log(action.payload);
        // state.listBlogs = [...state.listBlogs, action.payload];
        state.isUpdateBlogSuccess = true;
      })
      .addCase(deleteBlog.fulfilled, (state) => {
        // Add blog to the state array
        // console.log(action.payload);
        // state.listBlogs = [...state.listBlogs, action.payload];
        state.isDeleteBlogSuccess = true;
      });
  }
})

// Action creators are generated for each case reducer function
export const { resetCreate, resetUpdate, resetDelete } = blogSlice.actions
// decrement, incrementByAmount

export default blogSlice.reducer