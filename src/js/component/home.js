import React, { useState, useEffect } from "react";

const baseUrl = "https://assets.breatheco.de/apis/fake/todos/user/naglenda31";
export function TodoList() {
	const [list, setList] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const [checked, setCheckedTodo] = useState("");
	useEffect(() => {
		syncData();
	}, []);
	const syncData = () => {
		fetch(baseUrl)
			.then(response => {
				if (!response.ok) throw new Error(response.statusText);

				return response.json();
			})
			.then(data => {
				setList(data);
			})
			.catch(error => console.log(error));
	};

	const updateData = data => {
		console.log(data);
		fetch(baseUrl, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
			.then(response => {
				if (!response.ok) throw new Error(response.statusText);

				return response.json();
			})
			.then(data => {
				syncData();
			})
			.catch(error => console.log(error));
	};

	function handleTaskDelete(label) {
		let newList = list.filter(listItem => listItem.label != label);
		if (newList.length !== 0) {
			updateData(newList);
		} else {
			updateData([
				{
					label: "sample todo",
					done: false
				}
			]);
		}
	}

	const handleCheckedTodo = index => {
		let updatedList = [].concat(list);
		updatedList[index].checked = !updatedList[index].checked;
		let count = 0;
		for (let i = 0; i < updatedList.length; i++) {
			updatedList[i].checked && count++;
		}
		setCheckedTodo(count);
		updateData(updatedList);
	};

	const clearList = () => {
		updateData([{ label: "sample todo", done: false }]);
	};

	const handleKeyPress = e => {
		if (e.key === "Enter" && inputValue !== "") {
			updateData(
				list.concat({
					label: inputValue,
					done: false
				})
			);
			setInputValue("");
		}
	};
	return (
		<div className="d-flex flex-column align-items-center p-0">
			<h1 className="text-center my-4">Today I Will...</h1>
			<ul className="list-container list-unstyled">
				<li>
					<input
						className="text-center"
						type="text"
						placeholder="Enter your tasks here"
						onChange={e => setInputValue(e.target.value)}
						onKeyPress={e => handleKeyPress(e)}
						value={inputValue}
					/>
				</li>
				{list.map((listItem, index) => (
					<li className="px-4 d-flex list-item" key={index}>
						<input className="checkbox" type="checkbox" />
						<label htmlFor="my-checkbox"></label>
						<span
							className={
								listItem.checked
									? "custom-checkbox checked"
									: "custom-checkbox"
							}
							onClick={() => handleCheckedTodo(index)}
							id="my-checkbox"></span>
						{listItem.label}
						<div
							className="delete-icon ml-auto"
							onClick={() => handleTaskDelete(listItem.label)}>
							<i className="far fa-trash-alt"></i>
						</div>
					</li>
				))}

				<div className="d-flex total-items pl-2 ml-2 mt-2">
					{list.length === 0
						? "You're done!!"
						: list.length === 1
						? list.length + " task to complete"
						: list.length > 1
						? list.length + " tasks to complete"
						: list.length + " tasks to complete"}

					<span
						className="delete-list ml-auto mr-2 px-2"
						role="button"
						onClick={clearList}>
						Delete All
					</span>
				</div>
			</ul>
		</div>
	);
}
