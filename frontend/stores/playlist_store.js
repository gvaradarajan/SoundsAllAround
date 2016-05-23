var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var PlaylistConstants = require('../constants/playlist_constants');

var PlaylistStore = new Store(AppDispatcher);

var _playlists = {};

var resetPlaylist = function (playlist) {
  _playlists[playlist.id] = playlist;
};

var resetPlaylists = function (playlists) {
  _playlists = {};
  playlists.forEach(function (playlist) {
    resetPlaylist(playlist);
  });
};

PlaylistStore.all = function () {
  var playlists = [];
  for (var id in _playlists) {
    playlists.push(_playlists[id]);
  }
  return playlists;
};

PlaylistStore.find = function (id) {
  return _playlists[id];
};

PlaylistStore.addTrackToPlaylist = function (playlist_id, track) {
  _playlists[playlist_id].tracks.push(track);
},

PlaylistStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case PlaylistConstants.PLAYLISTS_RECEIVED:
      resetPlaylists(payload.playlists);
      PlaylistStore.__emitChange();
      break;
    case PlaylistConstants.PLAYLIST_RECEIVED:
      resetPlaylist(payload.playlist);
      PlaylistStore.__emitChange();
      break;
    case PlaylistConstants.PLAYLIST_UPDATED:
      resetPlaylist(payload.playlist);
      PlaylistStore.__emitChange();
      break;
    case PlaylistConstants.TRACK_ADDED:
      PlaylistStore.__emitChange();
      break;
    case PlaylistConstants.ADDED_TRACK_REGISTERED:
      PlaylistStore.addTrackToPlaylist(payload.playlist_id, payload.track);
      PlaylistStore.__emitChange();
      break;
    default:
      
  }
};

module.exports = PlaylistStore;
