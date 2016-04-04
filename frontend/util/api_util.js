var UserActions = require('../actions/user_actions');
var PlaylistActions = require('../actions/playlist_actions');
var TrackActions = require('../actions/track_actions');
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
  fetchSinglePlaylist: function (id) {
    $.ajax({
      method: 'GET',
      url: '/api/playlists/' + id,
      success: function (data) {
        PlaylistActions.receiveSinglePlaylist(data.playlist);
      },
      error: function () {
        console.log("YOU DONE FUCKED UP IN ApiUtil#fetchAllPlaylists");
      }
    });
  },
  fetchAllTracks: function () {
    $.ajax({
      method: 'GET',
      url: '/api/tracks',
      success: function (tracks) {
        TrackActions.receiveTracks(tracks);
      },
      error: function () {
        console.log("YOU DONE FUCKED UP IN ApiUtil#fetchAllTracks");
      }
    });
  },
  createAPlaylist: function (data, callback) {
    $.ajax({
      type: 'POST',
      url: '/api/playlists',
      data: data,
      dataType: 'json',
      success: function (data) {
        PlaylistActions.receivePlaylistCreation(data);
        callback && callback(data.playlist.user_id);
      },
      error: function () {
        console.log("YOU DONE FUCKED UP IN ApiUtil#createPlaylist");
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
        console.log("YOU DONE FUCKED UP IN ApiUtil#deleteAPlaylist");
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
        console.log("YOU DONE FUCKED UP IN ApiUtil#createNewUser");
      }
    });
  },
  getSearchResults: function (searchParams) {
    $.ajax({
      type: 'GET',
      url: '/api/search',
      data: searchParams,
      dataType: 'json',
      success: function (searchResults) {
        TrackActions.receiveSearchResults(searchResults);
      },
      error: function () {
        console.log("YOU DONE FUCKED UP IN ApiUtil#getSearchResults");
      }
    });
  }
};
