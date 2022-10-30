import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";

import configureStore from "./store/store";
import { getError } from "./store/errors";
import {
    titleChanged,
    taskDeleted,
    completeTask,
    getTasks,
    getTasksLoadingStatus,
    loadTasks,
    taskCreate,
} from "./store/task";

const store = configureStore();

const App = () => {
    const state = useSelector(getTasks());
    const isLoading = useSelector(getTasksLoadingStatus());
    const error = useSelector(getError());
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadTasks());
    }, []);

    const createTask = () => {
        const title = prompt("Введите название задачи");
        dispatch(taskCreate(title));
    };

    if (isLoading) {
        return <h1>...Loading</h1>;
    }
    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>App</h1>
            <hr />
            <h4 className='task'>
                <button onClick={() => createTask()}>Add Task </button>
                <ul className='state'>
                    {state.map((el) => (
                        <li key={el.id}>
                            <p>{el.title}</p>
                            <p> {`Completed : ${el.completed}`} </p>
                            <button
                                onClick={() => dispatch(completeTask(el.id))}
                            >
                                Complete
                            </button>
                            <button
                                onClick={() => dispatch(titleChanged(el.id))}
                            >
                                Change Title
                            </button>

                            <button
                                onClick={() => dispatch(taskDeleted(el.id))}
                            >
                                Delet Task
                            </button>
                            <hr />
                        </li>
                    ))}
                </ul>
            </h4>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
