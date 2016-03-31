var AppDispatcher = require('../dispatcher/dispatcher');

module.exports = {
  receivePlaylists: function (playlists) {
    AppDispatcher.dispatch({
      actionType: "PLAYLISTS_RECEIVED",
      playlists: playlists
    });
  },
  receivePlaylistCreation: function (playlist) {
    AppDispatcher.dispatch({
      actionType: "PLAYLIST_CREATED",
      playlists: playlist
    });
  }
};
