import { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
// import data from "./data.json";
import ToDoList from "./ToDoList";
import ToDoForm from "./ToDoForm";
// import useFetch from "./useFetch";

function App() {
  // const { data, isPending, error } = useFetch('http://localhost:8080/api/todos');
  const url = "http://localhost:8080/api/todos";
  const [update, setUpdate] = useState(0);
  const [toDoList, setToDoList] = useState([]);
  // const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch data from server");
        }
        return res.json();
      })
      .then((newdata) => {
        console.log(newdata);
        // setData(newdata);
        setIsPending(false);
        setError(null);
        setToDoList(newdata);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
  }, [update]);

  const handleToggle = (selectedId) => {
    const putUrl = url + "/" + { selectedId };
    let oldTask = null;
    let updateTask = null;

    toDoList.forEach((element) => {
      if (element.id === selectedId) {
        oldTask = element;
      }
    });

    if (oldTask) {
      updateTask = {
        id: selectedId,
        task: oldTask.task,
        done: !oldTask.done,
      };
    
      console.log(updateTask)

      fetch(putUrl, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updateTask),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .then(setUpdate(update + 1));
    }

    // let mapped = toDoList.map(task => {
    //   return task.id === id ? { ...task, complete: !task.complete }: { ...task };
    // });
    // setToDoList(mapped);
  };

  const handleFilter = () => {
    let filtered = toDoList.filter((task) => {
      return !task.done;
    });
    setToDoList(filtered);
  };

  const addTask = (userInput) => {
    const newTask = {
      id: 0,
      task: userInput,
      done: false,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .then(setUpdate(update + 1));
    // let copy = [...toDoList];
    // copy = [...copy, { id: toDoList.length + 1, task: userInput, complete: false}];
    // setToDoList(copy);
  };

  if (error) {
    return <div>Error</div>;
  }

  if (isPending || !toDoList) {
    return <div>Loading</div>;
  }

  if (toDoList) {
    return (
      <div className="App">
        <Header />
        <ToDoForm addTask={addTask} />
        <ToDoList
          toDoList={toDoList}
          handleToggle={handleToggle}
          handleFilter={handleFilter}
          addTask={addTask}
        />
      </div>
    );
  }
}

export default App;
