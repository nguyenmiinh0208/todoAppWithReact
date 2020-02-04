import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm'
import Control from './components/Control'
import TaskList from './components/TaskList'

class App extends Component {
  constructor(props) {
    super(props);
    this.handleDisplayForm = this.handleDisplayForm.bind(this);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditting: null,
      filter: {
        name: '',
        status: -1
      },
      keyWord: '',
      sort : {
        by: 'name',
        value: -1
      }
    }
  }

  componentDidMount() {
    if (localStorage && localStorage.getItem('tasks')) {
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: tasks
      })
    }
  }

  s4() {
    return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
  }

  generateID() {
    return this.s4() + this.s4() + '-' + this.s4() + this.s4() + '-' + this.s4() + this.s4();
  }

  handleDisplayForm() {
    // console.log(this.state)
    this.setState({
      isDisplayForm : true,
      taskEditting: null
    });
  }

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false,
      taskEditting: null
    })
  }

  onSubmit = (data) => {
    //phan biet truong hop them va chinh sua
    console.log(data)
    var taskList = this.state.tasks;
    if (data.id === '') {
      var task = {
        id: this.generateID(),
        name: data.name,
        status: data.status === 'true' ? true : false
      }
      taskList.push(task);
    } else {
      var index = this.findIndex(data.id);
      taskList[index] = data;
      //disme cho nay khong biet tai sao cu lay vao kieu chuoi, nen phai chuyen sang kieu bool cho dung
      if (taskList[index].status === 'true') {
        taskList[index].status = true;
      } else if (taskList[index].status === 'false') {
        taskList[index].status = false;
      }
    }
    this.setState({
      tasks: taskList,
      taskEditting: null
    });
    localStorage.setItem('tasks', JSON.stringify(taskList));
  }

  onUpdateStatus = (id) => {
    var tasks = this.state.tasks;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  onDelete = (id) => {
    var tasks = this.state.tasks;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    this.onCloseForm();
  }

  onUpdate = (id) => {
    var tasks = this.state.tasks;
    var index = this.findIndex(id);
    if (index !== -1) {
      this.setState({
        taskEditting: tasks[index],
        isDisplayForm : true //show form
      });
    }
  }

  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus, 10);
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus
      }
    });
  }

  onSearch = (keyWord) => {
    this.setState({
      keyWord: keyWord
    });
  }

  onClickSort = (sortBy, sortValue) => {
    // console.log(sortBy + ' - ' + sortValue)
    var sort = {
      by: sortBy,
      value: sortValue
    }
    this.setState({
      sort: sort
    });
  }

  findIndex(id) {
    var tasks = this.state.tasks;
    var index = -1;
    tasks.forEach((task, idx) => {
      if (task.id === id) {
        index = idx;
      }
    });
    return index;
  }

  render() {
    var {tasks, isDisplayForm, taskEditting, filter, keyWord, sort} = this.state; // var tasks = this.state.tasks;
    if (filter) {
      if(filter.name) {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }
      if(filter.status === 1 || filter.status === 0 || filter.status === -1) {
        tasks = tasks.filter((task) => {
          if(filter.status === -1) {
            return task;
          } else {
            return task.status === (filter.status === 1 ? true : false)
          }
        });   
      }
    }
    if (keyWord) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyWord) !== -1;
      });
    }
    if(sort) {
      if(sort.by === 'name') {
        if (sort.value === 1) {
          tasks.sort((a, b) => (a.name > b.name) ? -1 : 1) 
        } else if (sort.value === -1) {
          tasks.sort((a, b) => (a.name > b.name) ? 1 : -1) 
        }
      } else if (sort.by === 'status') {
        if (sort.value === 1) {
          tasks.sort((a, b) => (a.status > b.status) ? -1 : 1) 
        } else if (sort.value === -1) {
          tasks.sort((a, b) => (a.status > b.status) ? 1 : -1) 
        }
      }
    }
    var elmTaskForm = isDisplayForm ? 
      <TaskForm 
        onSubmit={this.onSubmit} 
        onCloseForm={this.onCloseForm}
        taskEditting={taskEditting}
      /> 
      : '';
    var classDisplayForm = elmTaskForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12';
    return (
      <div className="App">
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            {elmTaskForm}
          </div>
          <div className={classDisplayForm}>
            <button type="button" className="btn btn-primary" onClick={this.handleDisplayForm}>
              <span className="fa fa-plus mr-5" />Thêm Công Việc
            </button>
            <Control onSearch={this.onSearch} onClickSort={this.onClickSort}/>
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList 
                  tasks={tasks} 
                  onUpdateStatus={this.onUpdateStatus} 
                  onDelete={this.onDelete}
                  onUpdate={this.onUpdate}
                  onFilter={this.onFilter}
                  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default App;
