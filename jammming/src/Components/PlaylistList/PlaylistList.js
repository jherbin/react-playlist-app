import React, { Component } from 'react';
import APlaylist from '../APlaylist/APlaylist';
export class PlaylistList extends Component {
  render() {
    return (
      <div className="PlaylistList">
        {this.props.playlists.map((playlist) => (
          <APlaylist key={playlist.id} playlist={playlist} />
        ))}
      </div>
    );
  }
}

export default PlaylistList;
