import ToDo from './Todo';

const ToDoList = ({toDoList, handleToggle, handleFilter}) => {
    return (
        <div>
            {toDoList.map(todo => {
                return (
                    <ToDo key={todo.id + todo.task} todo={todo} handleToggle={handleToggle} handleFilter={handleFilter}/>
                )
            })}
            <button className='clearCompletedButton' style={{margin: '20px'}} onClick={handleFilter}>Clear Completed</button>
        </div>
    );
};

export default ToDoList;