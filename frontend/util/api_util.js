var UserActions = require('../actions/user_actions');
var PlaylistActions = require('../actions/playlist_actions');
var SessionActions = require('../actions/session_actions');

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
  },
  createAPlaylist: function (playlist) {
    $.ajax({
      method: 'POST',
      url: '/api/playlists',
      success: function () {
        PlaylistActions.receivePlaylistCreation(playlist);
      },
      error: function () {
        console.log("YOU DONE FUCKED UP IN ApiUtil#createAPlaylist");
      }
    });
  },
  login: function (credentials, callback) {
    $.ajax({
      type: 'POST',
      url: '/api/session',
      dataType: 'json',
      data: credentials,
      success: function (current_user) {
        SessionActions.receiveCurrentUser(current_user);
        callback && callback(current_user.id);
      }
    });
  },
  logout: function (callback) {
    $.ajax({
      type: 'DELETE',
      url: '/api/session',
      dataType: 'json',
      success: function () {
        SessionActions.logout();
        callback && callback();
      }
    });
  },
  fetchCurrentUser: function (callback) {
    $.ajax({
      type: 'GET',
      url: '/api/session',
      dataType: 'json',
      success: function () {
        SessionActions.receiveCurrentUser(current_user);
      },
      complete: function () {
        callback && callback();
      }
    });
  }
};
