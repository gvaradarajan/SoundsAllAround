var AppDispatcher = require('../dispatcher/dispatcher');

module.exports = {
  receivePlaylists: function (playlists) {
    AppDispatcher.dispatch({
      actionType: "PLAYLISTS_RECEIVED",
      playlists: playlists
    });
  }
};
