import { useState } from "react";

const ToDoForm = ({ addTask }) => {
    const [ userInput, setUserInput ] = useState('');

    const handleChange = (e) => {
        setUserInput(e.currentTarget.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(userInput !== ""){
            addTask(userInput);
        }
        setUserInput("");
    }
    return (
        <form onSubmit={handleSubmit} className="submitForm">
            <input value={userInput} type="text" onChange={handleChange} placeholder="Enter task..."></input>
            <button className="submitButton">Submit</button>
        </form>
    );
};

export default ToDoForm;