import PropTypes from "prop-types";
import { Button, Tag, Card, Tooltip } from "antd";

const TaskItem = ({ task, onDelete, onToggleCompletion, onEdit }) => {
  const isCompleted = task.completed;

  return (
    <section className="max-w-[1000px] mx-auto font-bold">
      <Card
        className={isCompleted ? "bg-lime-300 font-bold mb-3" : "mb-3"}
        title={
          <span className={isCompleted ? "line-through" : ""}>{task.name}</span>
        }
        actions={[
          <Tooltip title="Cannot edit a completed task" key="edit-tooltip">
            <Button
              key="edit"
              type="primary"
              onClick={onEdit}
              disabled={isCompleted} // Disable edit button if task is completed
            >
              Edit
            </Button>
          </Tooltip>,
          <Button key="delete" type="danger" onClick={() => onDelete(task.id)}>
            Delete
          </Button>,
          <Button key="toggle" onClick={() => onToggleCompletion(task)}>
            {isCompleted ? "Unmark" : "Complete"}
          </Button>,
        ]}
        extra={
          <Tag color={isCompleted ? "green" : "red"}>
            {isCompleted ? "Completed" : "Active"}
          </Tag>
        }
      >
        <h2>{task.description}</h2>
      </Card>
    </section>
  );
};

// Prop types validation
TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleCompletion: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default TaskItem;
