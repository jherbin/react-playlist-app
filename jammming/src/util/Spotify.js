let accessToken;
const clientId = 'f35722a48cc9476bb850f6119d771fd9';
const redirectUri = window.location.href;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    // check for access token match
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      // this clears the parameters after token expires
      window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessURL;
    }
  },

  changePlaylistItems(ID, trackUris) {
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    return fetch('https://api.spotify.com/v1/me', { headers: headers })
      .then((response) => response.json())
      .then((jsonResponse) => {
        const userId = jsonResponse.id;
        return fetch(
          `https://api.spotify.com/v1/users/${userId}/playlists/${ID}/tracks`,
          {
            headers: headers,
            method: 'PUT',
            body: JSON.stringify({ uris: trackUris }),
          }
        );
      });
  },

  changePlaylistName(ID, name) {
    if (!name) {
      return;
    }
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    return fetch(`https://api.spotify.com/v1/me`, { headers: headers })
      .then((response) => response.json())
      .then((jsonResponse) => {
        const userId = jsonResponse.id;
        return fetch(
          `https://api.spotify.com/v1/users/${userId}/playlists/${ID}`,
          {
            headers: headers,
            method: 'PUT',
            body: JSON.stringify({ name: name }),
          }
        );
      });
  },

  getUserName() {
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    return fetch(`https://api.spotify.com/v1/me`, { headers: headers })
      .then((response) => response.json())
      .then((jsonResponse) => {
        return jsonResponse.display_name;
      });
  },

  deletePlaylist(ID) {
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    return fetch(`https://api.spotify.com/v1/me`, { headers: headers })
      .then((response) => response.json())
      .then((jsonResponse) => {
        const userId = jsonResponse.id;
        return fetch(
          `https://api.spotify.com/v1/users/${userId}/playlists/${ID}/followers`,
          {
            headers: headers,
            method: 'DELETE',
          }
        );
      });
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          return [];
        }
        console.log(jsonResponse);
        console.log(jsonResponse.tracks.items);
        return jsonResponse.tracks.items;
      });
  },

  getPlaylists() {
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    return fetch(`https://api.spotify.com/v1/me`, { headers: headers })
      .then((response) => response.json())
      .then((jsonResponse) => {
        const userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: headers,
          method: 'GET',
        })
          .then((response) => response.json())
          .then((respond) =>
            respond.items.map((playlist) => ({
              id: playlist.id,
              name: playlist.name,
            }))
          );
      });
  },

  getPlaylist(ID) {
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    return fetch(`https://api.spotify.com/v1/me`, { headers: headers })
      .then((response) => response.json())
      .then((jsonResponse) => {
        const userId = jsonResponse.id;
        return fetch(
          `https://api.spotify.com/v1/users/${userId}/playlists/${ID}`,
          {
            headers: headers,
            method: 'GET',
          }
        )
          .then((respond) => respond.json())
          .then((response) => {
            return response;
          });
      });
  },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    return fetch('https://api.spotify.com/v1/me', { headers: headers })
      .then((response) => response.json())
      .then((jsonResponse) => {
        const userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({ name: name }),
        })
          .then((response) => response.json())
          .then((jsonResponse) => {
            const playlistId = jsonResponse.id;
            return fetch(
              `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
              {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ uris: trackUris }),
              }
            );
          });
      });
  },
};

export { Spotify };
