import './App.css';
import Playlist from '../Playlist/Playlist.js';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import React from 'react';
import { Spotify } from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.switchShowingPlaylist = this.switchShowingPlaylist.bind(this);
    this.state = {
      SearchResults: [],
      playlistName: 'Playlist name',
      playlistTracks: [],
      showingPlaylist: true,
    };
  }
  switchShowingPlaylist() {
    this.setState({ showingPlaylist: !this.state.showingPlaylist });
  }
  addTrack(track) {
    for (let playlistTrack in this.state.playlistTracks) {
      if (track.id === this.state.playlistTracks[playlistTrack].id) {
        alert('Track already added!');
        return;
      }
    }
    this.setState({ playlistTracks: [...this.state.playlistTracks, track] });
  }
  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id);
    this.setState({ playlistTracks: tracks });
  }
  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }
  savePlaylist() {
    const trackUris = this.state.playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: [],
      });
    });
  }
  search(term) {
    Spotify.search(term).then((SearchResults) => {
      this.setState({ SearchResults: SearchResults });
    });
  }
  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              SearchResults={this.state.SearchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              showingPlaylist={this.state.showingPlaylist}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
              onSwitch={this.switchShowingPlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
