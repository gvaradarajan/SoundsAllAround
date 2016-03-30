var AppDispatcher = require('../dispatcher/dispatcher');

module.exports = {
  receiveSingleUser: function (user) {
    AppDispatcher.dispatch({
      actionType: "USER_RECEIVED",
      user: user
    });
  }
};
