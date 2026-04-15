import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
export const fetchListUsers = createAsyncThunk(
  'users/fetchListUsers',
  async () => {
    // userId: number, thunkAPI
    const res = await fetch("http://localhost:8000/users");
    const data = await res.json();
    return data;
  }
)
export const createNewUser = createAsyncThunk(
  'users/createNewUser',
  async (userData: Omit<User, 'id'>, thunkAPI) => {
    // console.log(userData);
    const res = await fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: userData.email,
        name: userData.name,
      })
    });
    const data = await res.json();
    // console.log(">>> check data create: ", data);
    if (data && data.id) {
      thunkAPI.dispatch(fetchListUsers());
      // console.log(">>> check data create: ", data);
    }
    return data;
  }
)
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (userData: Partial<User> & { id: number }, thunkAPI) => {
    // console.log(userData);
    const res = await fetch(`http://localhost:8000/users/${userData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: userData.email,
        name: userData.name,
      })
    });
    const data = await res.json();
    // console.log(">>> check data create: ", data);
    if (data && data.id) {
      thunkAPI.dispatch(fetchListUsers());
      // console.log(">>> check data create: ", data);
    }
    return data;
  }
)
export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userData: Partial<User> & { id: number }, thunkAPI) => {
    // console.log(userData);
    const res = await fetch(`http://localhost:8000/users/${userData.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    });
    const data = await res.json();
    // console.log(">>> check data create: ", data);
    thunkAPI.dispatch(fetchListUsers());
    return data;
  }
)
interface User {
  id: number;
  name: string;
  email: string;
}
const initialState: {
  listUsers: User[];
  isCreateUserSuccess: boolean;
  isUpdateUserSuccess: boolean;
  isDeleteUserSuccess: boolean;
} = {
  listUsers: [],
  isCreateUserSuccess: false,
  isUpdateUserSuccess: false,
  isDeleteUserSuccess: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetCreate(state) {
      state.isCreateUserSuccess = false;
    },
    resetUpdate(state) {
      state.isUpdateUserSuccess = false;
    },
    resetDelete(state) {
      state.isDeleteUserSuccess = false;
    }

  },
  extraReducers: (builder) => {
    // add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchListUsers.fulfilled, (state, action) => {
      // Add user to the state array
      // console.log(action.payload);
      state.listUsers = action.payload;

    })
      .addCase(createNewUser.fulfilled, (state) => {
        // Add user to the state array
        // console.log(action.payload);
        // state.listUsers = [...state.listUsers, action.payload];
        state.isCreateUserSuccess = true;
      })
      .addCase(updateUser.fulfilled, (state) => {
        // Add user to the state array
        // console.log(action.payload);
        // state.listUsers = [...state.listUsers, action.payload];
        state.isUpdateUserSuccess = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        // Add user to the state array
        // console.log(action.payload);
        // state.listUsers = [...state.listUsers, action.payload];
        state.isDeleteUserSuccess = true;
      });
  }
})

// Action creators are generated for each case reducer function
export const { resetCreate, resetUpdate, resetDelete } = userSlice.actions
// decrement, incrementByAmount

export default userSlice.reducer