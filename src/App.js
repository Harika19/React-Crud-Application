import { useState, useEffect } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const showTasks = await fetchData();
      setTasks(showTasks);
    };
    getTasks();
  }, []);

  const fetchData = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    //console.log(data)
    return data;
  };

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    //console.log(data)
    return data;
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((task) => task.id !== id));
  };


  const toggleRem = async (id) => {
    const rem = await fetchTask(id);
    const updateTask = {...rem, reminder: !rem.reminder};

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method:'PUT',
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateTask),
    });

    const data = await res.json();
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  const addTask = async (task) => {
    const res = await fetch(
      "http://localhost:5000/tasks",
      { method: "POST" ,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      },
    );

    const data = await res.json();
    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) +1;
    // const newTask = { id, ...task}
    // setTasks([...tasks, newTask]);
  };

  return (
    <div className="container">
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleRem} />
      ) : (
        "No tasks to show"
      )}
      <Footer />
    </div>
  );
}

export default App;
