
const ToDo = ({todo, handleToggle}) => {

    const handleClick = (e) => {
        e.preventDefault()
        handleToggle(e.currentTarget.id)
    }
    return (
        <div id={todo.id} name="todo" value={todo.id} onClick={handleClick} className={todo.done ? "todo strike" : "todo"}>
            {todo.task}
        </div>
    );
};

export default ToDo;