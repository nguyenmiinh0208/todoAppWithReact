import React, { Component } from 'react';

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      status: false
    }
  }

  UNSAFE_componentWillMount() {
    if(this.props.taskEditting) {
      this.setState({
        id: this.props.taskEditting.id,
        name: this.props.taskEditting.name,
        status: this.props.taskEditting.status
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // console.log(nextProps)
    if(nextProps && nextProps.taskEditting) {
      this.setState({
        id: nextProps.taskEditting.id,
        name: nextProps.taskEditting.name,
        status: nextProps.taskEditting.status
      });
    } else if (nextProps && nextProps.taskEditting === null) {
      this.setState({
        id: '',
        name: '',
        status: false
      });
    } 
  }

  onCloseForm = () => {
    this.props.onCloseForm();
  }

  onChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.onClear();
    this.onCloseForm();

  }

  onClear = () => {
    this.setState({
      name: '',
      status: false
    });
  }

  render() {
    var {id} = this.state;
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">{id !== '' ? 'Cập nhật công việc' : 'Thêm công việc'}</h3>
          <span className="fa fa-times-circle text-right iconTat" onClick={this.onCloseForm}></span>
        </div>
        
        <div className="panel-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Tên :</label>
              <input type="text" className="form-control" 
              name="name" value={this.state.name} onChange={this.onChange}/>
            </div>
            <label>Trạng Thái :</label>
            <select className="form-control" required="required" 
            name="status" value={this.state.status} onChange={this.onChange}> 
              <option value={true}>Kích Hoạt</option>
              <option value={false}>Ẩn</option>
            </select>
            <br />
            <div className="text-center">
              <button type="submit" className="btn btn-warning">Thêm</button>&nbsp;
              <button type="button" className="btn btn-danger" onClick={this.onClear}>Hủy Bỏ</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default TaskForm;
