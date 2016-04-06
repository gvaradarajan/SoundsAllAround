var AppDispatcher = require('../dispatcher/dispatcher');
var TrackConstants = require('../constants/track_constants');

module.exports = {
  receiveTracks: function (tracks) {
    AppDispatcher.dispatch({
      actionType: TrackConstants.TRACKS_RECEIVED,
      tracks: tracks
    });
  },
  receiveSingleTrack: function (track) {
    AppDispatcher.dispatch({
      actionType: TrackConstants.TRACK_RECEIVED,
      track: track
    });
  },
  receiveTrackCreation: function (track) {
    AppDispatcher.dispatch({
      actionType: TrackConstants.TRACK_CREATED,
      track: track
    });
  },
  receiveSearchResults: function (searchResults) {
    AppDispatcher.dispatch({
      actionType: TrackConstants.SEARCHED_TRACKS_RECEIVED,
      searchResults: searchResults
    });
  }
};
