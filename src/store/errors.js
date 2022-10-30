import { createSlice } from "@reduxjs/toolkit";

const initialState = { entities: [] };

const errorSlise = createSlice({
    name: "error",
    initialState,
    reducers: {
        set(state, action) {
            state.entities.push(action.payload);
        },
    },
});

const { actions, reducer: errorReducer } = errorSlise;
const { set } = actions;

export const setError = (message) => (dispatch) => {
    dispatch(set(message));
};

export const getError = () => (state) => state.error.entities[0];

export default errorReducer;
