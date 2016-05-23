var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var SearchConstants = require('../constants/search_constants');

var SearchStore = new Store(AppDispatcher);

var _tracks = [];
var _playlists = [];
var _users = [];

var _updateSearch = function (results) {
  // debugger
  _tracks = results.tracks ? results.tracks : [];
  _playlists = results.playlists? results.playlists : [];
  _users = results.users ? results.users : [];
};

SearchStore.trackResults = function () {
  return _tracks.slice();
};

SearchStore.playlistResults = function () {
  return _playlists.slice();
};

SearchStore.userResults = function () {
  return _users.slice();
};

SearchStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case SearchConstants.SEARCH_RESULTS_RECEIVED:
      _updateSearch(payload.results);
      SearchStore.__emitChange();
      break;
    default:

  }
};

module.exports = SearchStore;
