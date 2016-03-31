var UserActions = require('../actions/user_actions');
var PlaylistActions = require('../actions/playlist_actions');

module.exports = {
  fetchSingleUser: function (id) {
    $.ajax({
      url: '/api/users/' + id,
      success: function (user) {
        UserActions.receiveSingleUser(user);
      },
      error: function () {
        console.log("YOU DONE FUCKED UP IN ApiUtil#fetchSingleUser");
      }
    });
  },
  fetchAllPlaylists: function () {
    $.ajax({
      method: 'GET',
      url: '/api/playlists',
      success: function (playlists) {
        PlaylistActions.receivePlaylists(playlists);
      },
      error: function () {
        console.log("YOU DONE FUCKED UP IN ApiUtil#fetchAllPlaylists");
      }
    });
  }
};
