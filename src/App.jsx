import { useEffect, useState } from "react";
import { Layout } from "antd";
import TaskList from "./components/TaskList";

const App = () => {
  const [tasks, setTasks] = useState(
    () => JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [editingTask, setEditingTask] = useState(null); // State to hold the currently editing task

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
    setEditingTask(null); // Reset editing task when adding a new task
  };

  const editTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    setEditingTask(null); // Reset editing task after editing
  };

  const deleteTask = (taskId) =>
    setTasks((prev) => prev.filter((task) => task.id !== taskId));

  const toggleCompletion = (task) => {
    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
  };

  const startEditingTask = (task) => {
    setEditingTask(task); // Set the task to be edited
  };

  return (
    <Layout className=" mb-3">
      <h1 className="text-2xl mb-6 text-center  font-bold text-lime-700 font-serif">
        MY TASK
      </h1>
      <TaskList
        tasks={tasks}
        onAddTask={addTask}
        onDelete={deleteTask}
        onToggleCompletion={toggleCompletion}
        onEdit={editTask}
        editingTask={editingTask} // Pass the current editing task
        startEditingTask={startEditingTask} // Pass the function to initiate editing
      />
    </Layout>
  );
};

export default App;
