var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var SessionConstants = require('../constants/session_constants');
var UserConstants = require('../constants/user_constants');
var UserStore = require('./user_store');


var CurrentUserStore = new Store(AppDispatcher);

var _currentUser = null;
var currentUserFetched = false;


var _setCurrentUser = function (user) {
  _currentUser = user;
  currentUserFetched = true;
};

var _removeCurrentUser = function () {
  _currentUser = null;
};

CurrentUserStore.currentUserFetched = function () {
  return currentUserFetched;
};

CurrentUserStore.currentUser = function () {
  return _currentUser;
};

CurrentUserStore.isLoggedIn = function () {
  return !!_currentUser;
};

CurrentUserStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case SessionConstants.CREDENTIALS_RECEIVED:
      _setCurrentUser(payload.user);
      CurrentUserStore.__emitChange();
      break;
    case SessionConstants.SESSION_COMPLETE:
      _removeCurrentUser();
      CurrentUserStore.__emitChange();
      break;
    case UserConstants.USER_CREATED:
      _setCurrentUser(payload.user);
      CurrentUserStore.__emitChange();
      break;
    case UserConstants.CURRENT_USER_RECEIVED:
      _setCurrentUser(payload.user);
      CurrentUserStore.__emitChange();
      break;

    // case "USER_RECEIVED":
    //   CurrentUserStore.resetCurrentUserStore(payload.user);
    //   CurrentUserStore.__emitChange();
    //   break;
    // case "PLAYLIST_CREATED":
    //   CurrentUserStore.resetCurrentUserStore(payload.user);
    //   break;
    default:

  }
};

module.exports = CurrentUserStore;
