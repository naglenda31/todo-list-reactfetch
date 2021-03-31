import React, { useState } from "react";

export function TodoList() {
	const [list, setList] = useState([]);
	const [inputValue, setInputValue] = useState("");
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
		<div className="">
			<h1 className="text-center my-3 display-3">ToDos</h1>
			<div className="container d-flex flex-column p-0">
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
						<li key={index}>{listItem.label}</li>
					))}
				</ul>
				<div className="total-items pl-2 ml-2">
					{list.length === 0
						? "You're done!!"
						: list.length === 1
						? list.length + " task to complete"
						: list.length > 1
						? list.length + " tasks to complete"
						: list.length + " tasks to complete"}
				</div>
			</div>
		</div>
	);
}
