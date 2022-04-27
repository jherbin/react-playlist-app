import React, { Component } from 'react';
import APlaylist from '../APlaylist/APlaylist';
import './PlaylistList.css';
export class PlaylistList extends Component {
  render() {
    return (
      <div className="PlaylistList">
        {this.props.playlists.map((playlist) => (
          <APlaylist
            key={playlist.id}
            playlist={playlist}
            deletePlaylist={this.props.deletePlaylist}
            startEditing={this.props.startEditing}
          />
        ))}
      </div>
    );
  }
}

export default PlaylistList;
