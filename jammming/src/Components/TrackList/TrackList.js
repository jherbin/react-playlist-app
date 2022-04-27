import React, { Component } from 'react';
import './TrackList.css';
import Track from '../Track/Track';

export class TrackList extends Component {
  render() {
    return (
      <div className="TrackList">
        {this.props.tracks.map((oneTrack) => (
          <Track
            track={oneTrack}
            onAdd={this.props.onAdd}
            key={oneTrack.track.id}
            onRemove={this.props.onRemove}
            isRemoval={this.props.isRemoval}
          />
        ))}
      </div>
    );
  }
}

export default TrackList;
