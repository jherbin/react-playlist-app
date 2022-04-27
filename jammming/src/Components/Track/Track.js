import React, { Component } from 'react';

export class Track extends Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }
  addTrack() {
    this.props.onAdd(this.props.track);
  }
  removeTrack() {
    this.props.onRemove(this.props.track);
  }
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.track.name}</h3>
          <p>
            {this.props.track.track.artists[0].name} |{' '}
            {this.props.track.track.album.name}
          </p>
        </div>
        {this.props.isRemoval ? (
          <button className="Track-action" onClick={this.removeTrack}>
            -
          </button>
        ) : (
          <button className="Track-action" onClick={this.addTrack}>
            +
          </button>
        )}
      </div>
    );
  }
}

export default Track;
