var AppDispatcher = require('../dispatcher/dispatcher');
var SessionConstants = require('../constants/session_constants');

module.exports = {
  receiveCurrentUser: function (user) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.CREDENTIALS_RECEIVED,
      user: user
    });
  },
  logout: function () {
    AppDispatcher.dispatch({
      actionType: SessionConstants.SESSION_COMPLETE
    });
  }
};
