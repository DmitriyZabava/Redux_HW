import { createSlice } from "@reduxjs/toolkit";
import todosService from "../services/todos.service";
import { setError } from "./errors";

const initialState = { entities: [], isLoading: true };

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        recived(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
        },
        update(state, action) {
            const elementIndex = state.entities.findIndex(
                (el) => el.id === action.payload.id
            );
            state.entities[elementIndex] = {
                ...state.entities[elementIndex],
                ...action.payload,
            };
        },
        created(state, action) {
            state.entities.push(action.payload);
            state.isLoading = false;
        },
        remove(state, action) {
            state.entities = state.entities.filter(
                (el) => el.id !== action.payload.id
            );
        },
        taskRequested(state) {
            state.isLoading = true;
        },
        teaskRequestFaild(state, action) {
            state.isLoading = false;
        },
    },
});

const { actions, reducer: taskReducer } = taskSlice;
const { update, remove, recived, taskRequested, teaskRequestFaild, created } =
    actions;

export const loadTasks = () => async (dispatch) => {
    dispatch(taskRequested());
    try {
        const data = await todosService.fetch();
        dispatch(recived(data));
    } catch (error) {
        dispatch(teaskRequestFaild());
        dispatch(setError(error.message));
    }
};

export const taskCreate = (payload) => async (dispatch) => {
    dispatch(taskRequested());
    console.log(payload);
    try {
        const data = await todosService.create({
            userId: 1,
            id: payload,
            title: payload,
            completed: false,
        });
        dispatch(created(data));
    } catch (error) {
        dispatch(teaskRequestFaild());
        dispatch(setError(error.message));
    }
};

export const completeTask = (id) => (dispatch) => {
    dispatch(update({ id, completed: true }));
};

export const titleChanged = (id) => (dispatch) => {
    dispatch(update({ id, title: `New title for ${id}` }));
};

export const taskDeleted = (id) => (dispatch) => {
    dispatch(remove({ id }));
};

export const getTasks = () => (state) => state.tasks.entities;

export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading;

export default taskReducer;
