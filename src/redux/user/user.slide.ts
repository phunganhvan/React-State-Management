import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
export const fetchListUsers= createAsyncThunk(
  'users/fetchListUsers',
  async (userId: number, thunkAPI) => {
    const res = await fetch("http://localhost:8000/users");
    const data = await res.json();
    return data; 
  }
)
export const createNewUser= createAsyncThunk(
  'users/createNewUser',
  async (userData: Omit<User, 'id'>, thunkAPI) => {
    console.log(userData);
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
    if(data && data.id){
      thunkAPI.dispatch(fetchListUsers());
      // console.log(">>> check data create: ", data);
    }
    return data; 
  }
)
interface User {
  id: number;
  name: string;
  email: string;
}
const initialState : {
  listUsers: User[];
  isCreateUserSuccess: boolean;
} = {
  listUsers: [],
  isCreateUserSuccess: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetCreate(state, _) {
      state.isCreateUserSuccess = false;
    }
  },
  extraReducers: (builder) => {
    // add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchListUsers.fulfilled, (state, action) => {
      // Add user to the state array
      // console.log(action.payload);
      state.listUsers = action.payload;
      
    });
    builder.addCase(createNewUser.fulfilled, (state, action) => {
      // Add user to the state array
      // console.log(action.payload);
      // state.listUsers = [...state.listUsers, action.payload];
      state.isCreateUserSuccess = true;
    });
  }
})

// Action creators are generated for each case reducer function
export const { resetCreate } = userSlice.actions
// decrement, incrementByAmount

export default userSlice.reducer