var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var TrackConstants = require('../constants/track_constants');

var TrackStore = new Store(AppDispatcher);

var _tracks = {};
var _searchedTracks = [];

var resetTrack = function (track) {
  _tracks[track.id] = track;
};

var resetTracks = function (tracks) {
  _tracks = {};
  tracks.forEach(function (track) {
    resetTrack(track);
  });
};

var _resetSearchedTracks = function (tracks) {
  _searchedTracks = tracks;
};

TrackStore.all = function () {
  var tracks = [];
  for (var id in _tracks) {
    tracks.push(_tracks[id]);
  }
  return tracks;
};

TrackStore.searchResults = function () {
  return _searchedTracks.slice();
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
    case TrackConstants.SEARCHED_TRACKS_RECEIVED:
      _resetSearchedTracks(payload.searchResults);
      TrackStore.__emitChange();
      break;
    case TrackConstants.TRACK_RECEIVED:
      resetTrack(payload.track);
      TrackStore.__emitChange();
      break;
    default:

  }
};

module.exports = TrackStore;
