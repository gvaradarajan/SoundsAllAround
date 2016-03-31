var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var PlaylistConstants = require('../constants/playlist_constants');
var UserConstants = require('../constants/user_constants');

var UserStore = new Store(AppDispatcher);

var _users = {};

var resetUser = function (user) {
  _users[user.id] = user;
};

UserStore.all = function () {
  var users = [];
  for (var id in _users) {
    users.push(_users[id]);
  }
  return users;
};

UserStore.find = function (id) {
  return _users[id];
};

UserStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case UserConstants.USER_RECEIVED:
      resetUser(payload.user);
      UserStore.__emitChange();
      break;
    case PlaylistConstants.PLAYLIST_CREATED:
      resetUser(payload.user);
      UserStore.__emitChange();
      break;
    default:

  }
};

module.exports = UserStore;
