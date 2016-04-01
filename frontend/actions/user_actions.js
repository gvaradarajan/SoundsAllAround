var AppDispatcher = require('../dispatcher/dispatcher');
var UserConstants = require('../constants/user_constants');

module.exports = {
  receiveSingleUser: function (user) {
    AppDispatcher.dispatch({
      actionType: UserConstants.USER_RECEIVED,
      user: user
    });
  },
  receiveCreatedUser: function (user) {
    AppDispatcher.dispatch({
      actionType: UserConstants.USER_CREATED,
      user: user
    });
  },
  receiveCurrentUser: function (user) {
    AppDispatcher.dispatch({
      actionType: UserConstants.CURRENT_USER_RECEIVED,
      user: user
    });
  }
};
