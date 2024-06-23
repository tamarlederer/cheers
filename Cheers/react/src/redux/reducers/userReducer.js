import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null
}

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {        
        postUser: (state, action) => {
            state.user = action.payload;  
            console.log(state.user) 
        },
    },
})

export const { postUser } = UserSlice.actions

export default UserSlice.reducer
