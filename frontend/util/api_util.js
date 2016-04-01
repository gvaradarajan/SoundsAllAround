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
  createAPlaylist: function (data, callback) {
    $.ajax({
      type: 'POST',
      url: '/api/playlists',
      data: data,
      dataType: 'json',
      success: function (playlist) {
        PlaylistActions.receivePlaylistCreation(playlist);
        callback && callback(playlist);
      },
      error: function () {
        console.log("YOU DONE FUCKED UP IN ApiUtil#deletePlaylist");
      }
    });
  },
  deletePlaylist: function (id, callback) {
    $.ajax({
      type: 'DELETE',
      url: '/api/playlists/' + id,
      data: id,
      dataType: 'json',
      success: function (user_id) {
        PlaylistActions.receivePlaylistDeletion(user_id);
        callback && callback(user_id);
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
      success: function (currentUser) {
        SessionActions.receiveCurrentUser(currentUser);
        callback && callback(currentUser.id);
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
      success: function (currentUser) {
        UserActions.receiveCurrentUser(currentUser);
      },
      complete: function () {
        callback && callback();
      }
    });
  },
  createNewUser: function (data, callback) {
    $.ajax({
      type: 'POST',
      url: '/api/users',
      data: data,
      dataType: 'json',
      success: function (createdUser) {
        UserActions.receiveCreatedUser(createdUser);
        callback && callback(createdUser.id);
      },
      error: function () {
        console.log('nope');
      }
    });
  }
};
