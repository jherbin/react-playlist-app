import React, { Component } from 'react';
import './APlaylist.css';

export class APlaylist extends Component {
  render() {
    return (
      <div>
        <div>{this.props.playlist.name}</div>
        <div></div>
      </div>
    );
  }
}

export default APlaylist;
