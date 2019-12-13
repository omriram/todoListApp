import React from 'react';
import "./task.styles.scss";
import "../../shared-styles.scss";
import { ReactComponent as CheckboxUnchecked } from "../assets/checkbox-unchecked.svg";
import { ReactComponent as CheckboxChecked } from "../assets/checkbox-checked.svg";
import { ReactComponent as DeleteTask } from "../assets/bin.svg";

const Task = ({task, onToggleClick, onDeleteClick, onEditTaskClick}) => {
    let taskNameClass, checkboxIcon;
    if(task.isDone) {
        checkboxIcon = <CheckboxChecked className="task__icon task__icon--toggle" />;
        taskNameClass = "task__name task-finished";
    } else {
        checkboxIcon = <CheckboxUnchecked className="task__icon task__icon--toggle" />;
        taskNameClass = "task__name";
    }
    console.log()
    return ( 
        <div className="task">
            <button className="btn task__toggle" onClick={() => onToggleClick(task.taskId)}>
                {checkboxIcon}
            </button>
            <span className={taskNameClass}
            onClick={() => onEditTaskClick(task.taskId, task.taskName, task.taskDescription)}>
                {task.taskName}
            </span>
            <button className="btn task__delete" onClick={() => onDeleteClick(task.taskId)}>
            <DeleteTask className="task__icon task__icon--delete" />
            </button>
 {/*            {task.taskDescription &&
            <div className="task__description"><u>description</u><br/>{task.taskDescription}</div> } */}
            
        </div>
     );
}
 
export default Task;