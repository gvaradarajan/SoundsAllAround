var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var TrackConstants = require('../constants/track_constants');

var PlayStore = new Store(AppDispatcher);

var currentlyPlayingId = null;

var _updateCurrentlyPlayingTrack = function (id) {
  currentlyPlayingId = id;
};

PlayStore.currentlyPlayingId = function () {
  return currentlyPlayingId;
};

PlayStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case TrackConstants.NEW_TRACK_PLAYING:
      _updateCurrentlyPlayingTrack(payload.id);
      PlayStore.__emitChange();
      break;
    default:

  }
};

module.exports = PlayStore;
