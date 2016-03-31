var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');

var UserPlaylistStore = new Store(AppDispatcher);

var _current_user = null;


UserPlaylistStore.resetCurrentUser = function (user) {
  _current_user = user;
};

UserPlaylistStore.all = function () {
  return _current_user && _current_user.playlists;
};

UserPlaylistStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case "USER_RECEIVED":
      UserPlaylistStore.resetCurrentUser(payload.user);
      UserPlaylistStore.__emitChange();
      break;
    default:

  }
};

module.exports = UserPlaylistStore;
