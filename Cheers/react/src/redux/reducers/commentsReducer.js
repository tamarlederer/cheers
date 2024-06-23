import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    listComments: []
}

export const CommentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        getComments: (state, action) => {
            state.listComments = (action.payload);
        },

        addComment: (state, action) => {
            state.listComments.push(action.payload);
        },
    },
})

export const { getComments, addComment} = CommentSlice.actions
export default CommentSlice.reducer
