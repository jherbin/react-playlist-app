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
    this.startEditingPlaylist = this.startEditingPlaylist.bind(this);
    this.finishEditingPlaylist = this.finishEditingPlaylist.bind(this);
    this.startCreatingNewPlaylist = this.startCreatingNewPlaylist.bind(this);

    this.state = {
      userName: '',
      SearchResults: [],
      playlistName: 'Playlist name',
      playlistTracks: [],
      playlistId: '',
      editingPlaylist: false,
      creatingNewPlaylist: false,
      Playlists: [],
    };
  }

  startCreatingNewPlaylist() {
    this.setState({
      playlistName: 'Playlist name',
      playlistTracks: [],
      editingPlaylist: true,
      creatingNewPlaylist: true,
      playlistId: '',
    });
  }

  startEditingPlaylist(ID) {
    Spotify.getPlaylist(ID).then((playlist) => {
      this.setState({
        playlistName: playlist.name,
        playlistId: playlist.id,
        playlistTracks: playlist.tracks.items.map((item) => item.track),
        editingPlaylist: true,
      });
    });
  }

  finishEditingPlaylist() {
    const trackUris = this.state.playlistTracks.map((track) => track.uri);
    Spotify.changePlaylistItems(this.state.playlistId, trackUris)
      .then(
        Spotify.changePlaylistName(
          this.state.playlistId,
          this.state.playlistName
        )
      )
      .then(this.switchEditingPlaylist());
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
    if (this.state.editingPlaylist)
      Spotify.getPlaylists().then((playlists) =>
        setTimeout(() => {
          this.setState({ Playlists: playlists });
        }, 2500)
      );
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

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris)
      .then(() => {
        this.setState({
          playlistName: 'New Playlist',
          playlistTracks: [],
        });
      })
      .then(this.switchEditingPlaylist());
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
        <header className="header">
          <h1>
            Ja<span className="highlight">mmm</span>ing
          </h1>
          <h1 className="userName">
            Logged as: <span className="highlight">{this.state.userName}</span>
          </h1>
        </header>
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
              playlistId={this.state.playlistId}
              showingPlaylist={this.state.showingPlaylist}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
              onUpdate={this.finishEditingPlaylist}
              playlists={this.state.Playlists}
              deletePlaylist={this.deletePlaylist}
              startEditing={this.startEditingPlaylist}
              creatingNewPlaylist={this.state.creatingNewPlaylist}
              onCreate={this.startCreatingNewPlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
