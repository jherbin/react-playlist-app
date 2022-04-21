import './App.css';
import Playlist from '../Playlist/Playlist.js';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.state = {
      SearchResults: [
        {
          name: 'Tiny Dancer',
          artist: 'Elton John',
          album: 'Madman Across The Water',
          id: 1
        },
        {
          name: 'Stronger',
          artist: 'Britney Spears',
          album: 'Oops!... I Did It Again',
          id: 2
        },
      ],
      playlistName: "My playlist",
      playlistTracks: [
        {
          name: 'Tiny Dancer',
          artist: 'Elton bob',
          album: 'Madman Across The Water',
          id: 3
        },
        {
          name: 'Stronger',
          artist: 'Britney BOB',
          album: 'Oops!... I Did It Again',
          id: 4
        },
      ]
    };
  }
  addTrack(track) {
    for(let playlistTrack in this.state.playlistTracks) {
      if (track.id === this.state.playlistTracks[playlistTrack].id) {
        alert('Track already added!')
        return
      }
    }
    this.setState({playlistTracks: [...this.state.playlistTracks, track]})
  }
  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id)
    this.setState({playlistTracks: tracks})
  }
  updatePlaylistName(name) {
    this.setState({playlistName: name})
  }
  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          {/* Add a SearchBar component */}
          <div className="App-playlist">
            <SearchResults 
              SearchResults={this.state.SearchResults} 
              onAdd={this.addTrack}
            />
            <Playlist 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks} 
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
