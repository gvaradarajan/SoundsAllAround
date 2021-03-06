var AppDispatcher = require('../dispatcher/dispatcher');
var PlaylistConstants = require('../constants/playlist_constants');

module.exports = {
  receivePlaylists: function (playlists) {
    AppDispatcher.dispatch({
      actionType: PlaylistConstants.PLAYLISTS_RECEIVED,
      playlists: playlists
    });
  },
  receiveSinglePlaylist: function (playlist) {
    AppDispatcher.dispatch({
      actionType: PlaylistConstants.PLAYLIST_RECEIVED,
      playlist: playlist
    });
  },
  receivePlaylistCreation: function (playlist) {
    AppDispatcher.dispatch({
      actionType: PlaylistConstants.PLAYLIST_CREATED,
      playlist: playlist
    });
  },
  receivePlaylistDeletion: function (user_id) {
    AppDispatcher.dispatch({
      actionType: PlaylistConstants.PLAYLIST_DELETED,
      user_id: user_id
    });
  },
  receiveUpdatedPlaylist: function (playlist) {
    AppDispatcher.dispatch({
      actionType: PlaylistConstants.PLAYLIST_UPDATED,
      playlist: playlist
    });
  },
  receiveAddedTrack: function (track) {
    AppDispatcher.dispatch({
      actionType: PlaylistConstants.TRACK_ADDED,
      track: track
    });
  },
  updateAddedTrack: function (playlist_id, track) {
    AppDispatcher.dispatch({
      actionType: PlaylistConstants.ADDED_TRACK_REGISTERED,
      playlist_id: playlist_id,
      track: track
    });
  }
};
