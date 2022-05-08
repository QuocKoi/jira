import React, { Component } from 'react'
import axios from 'axios'
import '../../assets/styleTodoList.css'
export default class ToDoList extends Component {
  state = {
    toggle: '',
    data: [],
    value: {
      taskName: '',
    },
    error: {
      taskName: '',
    }
  }
  getTaskList = () => {
    axios({
      method: 'GET',
      url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask'
    }).then((result) => {
      this.setState({ data: result.data })
    })
  }
  renderTodoList = () => {
    return this.state.data.filter(item => !item.status).map((item, index) => {
      return <li key={index}>
        <span>{item.taskName}</span>
        <div className="buttons">
          <button className="remove" onClick={()=>{this.deleTask(item.taskName)}}><i className="fa fa-trash-alt" /></button>
          <button className="complete" onClick={()=>{this.doneTask(item.taskName)}}>
            <i className="fa fa-check-circle " />
          </button>
        </div>
      </li>
    })
  }
  renderToDoComplete = () => {
    return this.state.data.filter(item => item.status).map((item, index) => {
      return <li key={index}>
        <span>{item.taskName}</span>
        <div className="buttons">
          <button className="remove" onClick={()=>{this.deleTask(item.taskName)}}><i className="fa fa-trash-alt" /></button>
          <button className="complete" onClick={()=>{this.undoTask(item.taskName)}}>
            <i className="fa fa-check-circle " />
          </button>
        </div>
      </li>
    })
  }
  handleGetValue = (e) => {
    let newValue = { ...this.state.value };
    let newError = { ...this.state.error };

    let { value, name } = e.target;
    newError[name] = value.trim() === '' ? `${name} is required` : '';
    newValue[name] = value;
    this.setState({
      value: newValue,
      error: newError
    })
  }
  addTask = () => {
    let index = this.state.data.findIndex(item => item.taskName === this.state.value.taskName);
    if (index === -1) {
      axios({
        url: `http://svcy.myclass.vn/api/ToDoList/AddTask`,
        method: 'POST',
        data: { taskName: this.state.value.taskName }
      }).then((result) => {
        this.getTaskList();
        this.setState({
          value:{...this.state.value,taskName:''}
        })
      })
    }else{
      alert('Task đã tồn tại')
    }
  }
  deleTask=(name)=>{
    axios({
      url:`http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${name}`,
      method:'DELETE',
    }).then((result)=>{
      this.getTaskList()
    })
  }
  doneTask=(name)=>{
    axios({
      url:`http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${name}`,
      method:'PUT'
    }).then(()=>{
      this.getTaskList()
    })
  }
  undoTask=(name)=>{
    axios({
      url:`http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${name}`,
      method:'PUT'
    }).then(()=>{
      this.getTaskList()
    })
  }
  render() {
    return (
      <div className="card">
        <div className="card__header">
          <img src={require("../../assets/img/X2oObC4.png")} />
        </div>
        {/* <h2>hello!</h2> */}
        <div className="card__body">
          <div className={`filter-btn ${this.state.toggle}`}>
            <a id="one" href="#" ><i className="fa fa-check-circle" /></a>
            <a id="two" href="#" ><i className="fa fa-sort-alpha-down" /></a>
            <a id="three" href="#" ><i className="fa fa-sort-alpha-up" /></a>
            <a id="all" href="#"><i className="fa fa-clock" /></a>
            <span className="toggle-btn">
              <i className="fa fa-filter" onClick={() => { this.setState({ toggle: 'open' }) }} />
              <i className="fa fa-times" onClick={() => { this.setState({ toggle: '' }) }} />
            </span>
          </div>
          <div className="card__content">
            <div className="card__title">
              <h2>My Tasks</h2>
              <p id="date">September 9,2020</p>
            </div>
            <div className="card__add">
              <input id="newTask" value={this.state.value.taskName} name='taskName' type="text" placeholder="Enter an activity..." onChange={this.handleGetValue} />
              <button id="addItem" onClick={() => { this.addTask() }}>
                <i className="fa fa-plus" />
              </button>
            </div>
            <span className="text-danger" id="check_blank" >{this.state.error.taskName}</span>
            <div className="card__todo">
              {/* Uncompleted tasks */}
              <ul className="todo" id="todo">
                {this.renderTodoList()}
              </ul>
              {/* Completed tasks */}
              <ul className="todo" id="completed">
                {this.renderToDoComplete()}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
  componentDidMount() {
    this.getTaskList()
  }

}

