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
    this.switchEditingPlaylist = this.switchEditingPlaylist.bind(this);
    this.deletePlaylist = this.deletePlaylist.bind(this);

    this.state = {
      userName: '',
      SearchResults: [],
      playlistName: 'Playlist name',
      playlistTracks: [],
      editingPlaylist: true,
      Playlists: [],
    };
  }
  deletePlaylist(ID) {
    Spotify.deletePlaylist(ID).then(
      this.setState({
        Playlists: this.state.Playlists.filter(
          (playlist) => playlist.id !== ID
        ),
      })
    );
  }
  switchEditingPlaylist() {
    this.setState({ editingPlaylist: !this.state.editingPlaylist });
  }
  addTrack(track) {
    for (let playlistTrack in this.state.playlistTracks) {
      if (track.id === this.state.playlistTracks[playlistTrack].id) {
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
  updateUserPlaylists() {
    this.setState({
      userPlaylists: Spotify.getPlaylists(),
    });
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
  componentDidMount() {
    Spotify.getUserName().then((userName) =>
      this.setState({ userName: userName })
    );
    Spotify.getPlaylists().then((playlists) =>
      this.setState({ Playlists: playlists })
    );
  }
  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="userName">Logged as: {this.state.userName}</div>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              SearchResults={this.state.SearchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              onSwitch={this.switchEditingPlaylist}
              isEditing={this.state.editingPlaylist}
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              showingPlaylist={this.state.showingPlaylist}
              userPlaylists={this.state.userPlaylists}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
              playlists={this.state.Playlists}
              deletePlaylist={this.deletePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
