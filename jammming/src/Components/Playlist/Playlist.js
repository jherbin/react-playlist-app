import React, { Component } from 'react';
import './Playlist.css';
import { TrackList } from '../TrackList/TrackList';
import PlaylistList from '../PlaylistList/PlaylistList';

export class Playlist extends Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
  }
  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }
  handleSwitch() {
    this.props.onSwitch();
  }
  handleGetPlaylists() {
    this.props.getPlaylists();
  }

  render() {
    return (
      <div className="Playlist">
        {!this.props.isEditing && (
          <div>
            <button className="Playlist-switch" onClick={this.props.onSwitch}>
              Show current playlist
            </button>
            <PlaylistList
              playlists={this.props.playlists}
              deletePlaylist={this.props.deletePlaylist}
            />
          </div>
        )}
        {this.props.isEditing && (
          <div>
            <button className="Playlist-switch" onClick={this.props.onSwitch}>
              Show all playlists
            </button>

            <input
              value={this.props.playlistName}
              onChange={this.handleNameChange}
            />
            <TrackList
              tracks={this.props.playlistTracks}
              onRemove={this.props.onRemove}
              isRemoval={true}
            />
            <button className="Playlist-save" onClick={this.props.onSave}>
              SAVE TO SPOTIFY
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Playlist;
