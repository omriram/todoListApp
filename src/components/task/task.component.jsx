import React from 'react';
import "./task.styles.scss";
import "../../shared-styles.scss";
import { ReactComponent as CheckboxUnchecked } from "../assets/checkbox-unchecked.svg";
import { ReactComponent as CheckboxChecked } from "../assets/checkbox-checked.svg";
import { ReactComponent as DeleteTask } from "../assets/bin.svg";

const Task = ({task, onToggleClick, onDeleteClick, onEditTaskClick}) => {
    let taskNameClass, checkboxIcon;
    if(task.is_done) {
        checkboxIcon = <CheckboxChecked className="task__icon task__icon--toggle" />;
        taskNameClass = "task__name task-finished";
    } else {
        checkboxIcon = <CheckboxUnchecked className="task__icon task__icon--toggle" />;
        taskNameClass = "task__name";
    }

 
    return ( 
        <div className="task">
            <button className="btn task__toggle" onClick={() => onToggleClick(task.id)}>
                {checkboxIcon}
            </button>
            <span tabIndex="0" className={taskNameClass}
            onClick={() => onEditTaskClick(task.id, task.title, task.description)}>
                {task.title}
            </span>
            <button className="btn task__delete" onClick={() => onDeleteClick(task.id)}>
            <DeleteTask className="task__icon task__icon--delete" />
            </button>
        </div>
     );
}
 
export default Task;