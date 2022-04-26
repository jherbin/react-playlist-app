import React, { Component } from 'react';
import './APlaylist.css';

//https://open.spotify.com/playlist/playlistID
export class APlaylist extends Component {
  constructor(props) {
    super(props);
    this.play = this.play.bind(this);
    this.delete = this.delete.bind(this);
  }
  play() {
    window.open(
      `https://open.spotify.com/playlist/${this.props.playlist.id}`,
      '_blank'
    );
  }
  delete() {
    this.props.deletePlaylist(this.props.playlist.id);
  }
  render() {
    return (
      <div className="APlaylist">
        <div className="Playlist-name">
          <h3>{this.props.playlist.name}</h3>
        </div>
        <div className="buttons">
          <button className="play" onClick={this.play}>
            Play
          </button>
          <button className="edit">Edit</button>
          <button className="delete" onClick={this.delete}>
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default APlaylist;
