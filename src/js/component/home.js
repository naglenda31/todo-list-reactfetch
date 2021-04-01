import React, { useState } from "react";

export function TodoList() {
	const [list, setList] = useState([]);
	const [inputValue, setInputValue] = useState("");
	function handleTaskDelete(label) {
		let newList = list.filter(listItem => listItem.label != label);
		setList(newList);
	}
	const handleKeyPress = e => {
		if (e.key === "Enter" && inputValue !== "") {
			setList(
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
						{listItem.label}
						<div
							className="delete-icon ml-auto"
							onClick={() => handleTaskDelete(listItem.label)}>
							<i className="far fa-trash-alt"></i>
						</div>
					</li>
				))}

				<div className="total-items pl-2 ml-2 mt-2">
					{list.length === 0
						? "You're done!!"
						: list.length === 1
						? list.length + " task to complete"
						: list.length > 1
						? list.length + " tasks to complete"
						: list.length + " tasks to complete"}
				</div>
			</ul>
		</div>
	);
}
