var ApiActions = require('../actions/user_actions');

module.exports = {
  fetchSingleUser: function (id) {
    $.ajax({
      url: 'api/users/' + id,
      success: function (user) {
        ApiActions.receiveSingleUser(user);
      },
      error: function () {
        console.log("YOU DONE FUCKED UP IN ApiUtil#fetchSingleUser");
      }
    });
  }
};
