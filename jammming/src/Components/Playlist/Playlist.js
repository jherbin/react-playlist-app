import React, { Component } from 'react';
import './Playlist.css';
import { TrackList } from '../TrackList/TrackList';
import UserPlaylist from '../UserPlaylists/UserPlaylist';

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

  render() {
    return (
      <div className="Playlist">
        {this.props.showingPlaylist && (
          <label id="switchLabel">
            Show Playlists
            <input
              id="switch"
              type="checkbox"
              checked={this.props.showingPlaylist}
              onChange={(e) => this.handleSwitch(e.target.value)}
            />
          </label>
        )}
        {this.props.showingPlaylist && (
          <div>
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
        {!this.props.showingPlaylist && <div>bob</div>}
      </div>
    );
  }
}

export default Playlist;
