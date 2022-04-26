import React, { Component } from 'react';
import './UserPlaylist.css';

export class UserPlaylist extends Component {
  render() {
    return <div>{this.props.UserPlaylist[0].name}</div>;
  }
}

export default UserPlaylist;
