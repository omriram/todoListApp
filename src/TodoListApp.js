import React, { Component } from "react";
import TaskList from "./components/task-list/task-list.component";
import TaskForm from "./components/task-form/task-form.component";
import axios from "axios";
import "./TodoListApp.scss";

class TodoListApp extends Component {
  constructor() {
    super();
    this.state = {
      tasksList: [],
      createTask: false,
      editTask: {},
      openEditTask: false
    };
  }

  onToggleClick = taskIdInput => {
    this.axiosRequest("changeTaskStatus", "post", taskIdInput);
  };

  onDeleteClick = taskIdInput => {
    this.axiosRequest("delete", "post", taskIdInput);
  };

  onAddTaskClick = () => {
    this.setState(prevState => {
      return {
        createTask: !prevState.createTask
      };
    });
  };

  onSubmitTaskClick = (editTaskId, taskName, taskDescription) => {
    let route = "";

    if (taskName !== "") {
      if (editTaskId === null) {
        route = "create";
        this.setState({ createTask: false });
      } else {
        route = "edit";
        this.setState({ openEditTask: false });
      }
      this.axiosRequest(route, "post", editTaskId, taskName, taskDescription);
    }
  };

  onEditTaskClick = (taskId, taskName, taskDescription) => {
    const editTask = {
      taskId,
      taskName,
      taskDescription
    };

    this.setState({ editTask, openEditTask: true });
  };

  onFormExitClick = formName => {
    switch (formName) {
      case "createNewTask":
        this.setState({ createTask: false });
        break;
      case "editTask":
        this.setState({ openEditTask: false });
        break;
      default:
        break;
    }
  };

  axiosRequest = (
    route,
    method,
    taskId = null,
    taskName = null,
    taskDescription = null
  ) => {
    axios({
      method,
      url: `http://localhost:8000/${route}`,
      data: {
        taskId,
        taskName,
        taskDescription
      }
    }).then(res => this.setState({ tasksList: res.data }));
  };

  componentDidMount() {
    this.axiosRequest("", "get");
  }

  render() {
    return (
      <div className="container">
        <TaskList
          tasksList={this.state.tasksList}
          onToggleClick={this.onToggleClick}
          onDeleteClick={this.onDeleteClick}
          onAddTaskClick={this.onAddTaskClick}
          onEditTaskClick={this.onEditTaskClick}
          openEditTask={this.state.openEditTask}
        />
        {this.state.createTask && (
          <TaskForm
            className={""}
            onSubmitTaskClick={this.onSubmitTaskClick}
            onFormExitClick={this.onFormExitClick}
          />
        )}
        {this.state.openEditTask && (
          <TaskForm
            className={"edit-form-location"}
            onSubmitTaskClick={this.onSubmitTaskClick}
            editTask={this.state.editTask}
            onFormExitClick={this.onFormExitClick}
          />
        )}
      </div>
    );
  }
}

export default TodoListApp;
