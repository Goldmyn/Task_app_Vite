import PropTypes from "prop-types";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

const TaskList = ({
  tasks,
  onAddTask,
  onDelete,
  onToggleCompletion,
  onEdit,
  editingTask,
  startEditingTask,
}) => (
  <div className="">
    <TaskForm onAddTask={onAddTask} editingTask={editingTask} onEdit={onEdit} />
    {tasks.map((task) => (
      <TaskItem
        key={task.id} // Ensure a unique key prop is provided here
        task={task}
        onDelete={onDelete}
        onToggleCompletion={onToggleCompletion}
        onEdit={() => startEditingTask(task)}
      />
    ))}
  </div>
);

// Prop types validation
TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onAddTask: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleCompletion: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  editingTask: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    completed: PropTypes.bool,
  }),
  startEditingTask: PropTypes.func.isRequired,
};

export default TaskList;
