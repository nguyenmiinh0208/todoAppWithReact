import React, { Component } from 'react';
import Search from './Search'
import Sort from './Sort'
class Control extends Component {
  render() {
    return (
      <div className="row mt-15" style={{marginTop: 15}}>
        <Search onSearch={this.props.onSearch}/>
        <Sort onClickSort={this.props.onClickSort}/>  
      </div>     
    );
  }
  
}

export default Control;
