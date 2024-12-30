import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Input, Button } from "antd";
const { TextArea } = Input;

const TaskForm = ({ onAddTask, editingTask, onEdit }) => {
  const [taskDetails, setTaskDetails] = useState({ name: "", description: "" });

  useEffect(() => {
    if (editingTask) {
      setTaskDetails({
        name: editingTask.name,
        description: editingTask.description,
      });
    } else {
      setTaskDetails({ name: "", description: "" });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskDetails.name || !taskDetails.description) {
      alert("Please fill in both fields");
      return;
    }
    if (editingTask) {
      onEdit({ ...editingTask, ...taskDetails }); // Edit existing task
    } else {
      onAddTask({ ...taskDetails, completed: false, id: Date.now() }); // Add new task
    }
    setTaskDetails({ name: "", description: "" }); // Reset fields after submission
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 grid gap-2 max-w-[600px] px-4 mx-auto"
    >
      <div className="flex justify-end">
        <Button
          htmlType="submit"
          className="w-fit shadow-md bg-green-300 text-white font-bold "
        >
          {editingTask ? "Update Task" : "Add Task"}{" "}
          {/* Change button text based on mode */}
        </Button>
      </div>
      <Input
        name="name"
        placeholder="Task Name"
        value={taskDetails.name}
        onChange={handleChange}
        size="middle"
      />
      <TextArea
        name="description"
        placeholder="Task Description"
        value={taskDetails.description}
        onChange={handleChange}
        autoSize={{ minRows: 4 }}
        size="large"
      />
    </form>
  );
};

// Prop types validation
TaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  editingTask: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    completed: PropTypes.bool,
  }),
};

export default TaskForm;
