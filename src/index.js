import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import * as actions from "./store/actions";
import { initiateStore } from "./store/store";

const store = initiateStore();

const App = () => {
	const [state, setState] = useState(store.getState());

	useEffect(() => {
		store.subscribe(() => {
			setState(store.getState());
		});
	}, []);

	const comleteTask = (taskId) => {
		store.dispatch(actions.taskCompleted(taskId));
	};

	const changeTitle = (taskId) => {
		store.dispatch(actions.titleChanged(taskId));
	};
	const deletTask = (taskId) => {
		store.dispatch(actions.taskDeleted(taskId));
	};

	return (
		<div>
			<h1>App</h1>
			<hr />
			<h4 className="task">
				<ul className="state">
					{state.map((el) => (
						<li key={el.id}>
							<p>{el.title}</p>
							<p> {`Completed : ${el.completed}`} </p>
							<button onClick={() => comleteTask(el.id)}>
								Complete
							</button>
							<button onClick={() => changeTitle(el.id)}>
								Change Title
							</button>

							<button onClick={() => deletTask(el.id)}>
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
		<App />
	</React.StrictMode>
);
