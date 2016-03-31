var AppDispatcher = require('../dispatcher/dispatcher');
var PlaylistConstants = require('../constants/playlist_constants');

module.exports = {
  receivePlaylists: function (playlists) {
    AppDispatcher.dispatch({
      actionType: PlaylistConstants.PLAYLISTS_RECEIVED,
      playlists: playlists
    });
  },
  receivePlaylistCreation: function (playlist) {
    AppDispatcher.dispatch({
      actionType: PlaylistConstants.PLAYLIST_CREATED,
      playlists: playlist
    });
  }
};
