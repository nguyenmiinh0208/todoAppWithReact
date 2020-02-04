import React, { Component } from 'react';

class TaskItem extends Component {
  onUpdateStatus = () => {
    this.props.onUpdateStatus(this.props.tasks.id);
  }

  onDelete = () => {
    this.props.onDelete(this.props.tasks.id);
  }

  onUpdate = () => {
    this.props.onUpdate(this.props.tasks.id);
  }

  render() {
    return (
      <tr>
        <td>{this.props.index + 1}</td>
        <td>{this.props.tasks.name}</td>
        <td className="text-center">
          <span 
            className={this.props.tasks.status === true ? 'label label-success' : 'label label-danger'}
            onClick={this.onUpdateStatus}>
            {this.props.tasks.status === true ? 'Kích hoạt' : 'Ẩn'}
          </span>
        </td>
        <td className="text-center">
          <button type="button" className="btn btn-warning" onClick={this.onUpdate}>
            <span className="fa fa-pencil mr-5" />Sửa
          </button>
          &nbsp;
          <button type="button" className="btn btn-danger" onClick={this.onDelete}>
            <span className="fa fa-trash mr-5" />Xóa
          </button>
        </td>
      </tr>
    );
  }
  
}

export default TaskItem;
