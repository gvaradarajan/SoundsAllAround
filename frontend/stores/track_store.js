var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var TrackConstants = require('../constants/track_constants');

var TrackStore = new Store(AppDispatcher);

var _tracks = {};

var resetTrack = function (track) {
  _tracks[track.id] = track;
};

var resetTracks = function (tracks) {
  _tracks = {};
  tracks.forEach(function (track) {
    resetTrack(track);
  });
};

TrackStore.all = function () {
  var tracks = [];
  for (var id in _tracks) {
    tracks.push(_tracks[id]);
  }
  return tracks;
};

TrackStore.find = function (id) {
  return _tracks[id];
};

TrackStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case TrackConstants.TRACKS_RECEIVED:
      resetTracks(payload.tracks);
      TrackStore.__emitChange();
      break;
    default:

  }
};

module.exports = TrackStore;
