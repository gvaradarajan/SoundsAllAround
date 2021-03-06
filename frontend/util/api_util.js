var UserActions = require('../actions/user_actions');
var PlaylistActions = require('../actions/playlist_actions');
var TrackActions = require('../actions/track_actions');
var SessionActions = require('../actions/session_actions');
var SearchActions = require('../actions/search_actions');

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
        PlaylistActions.receiveSinglePlaylist(data);
      },
      error: function () {
        console.log("YOU DONE FUCKED UP IN ApiUtil#fetchSinglePlaylist");
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
  fetchSingleTrack: function (id, callback) {
    $.ajax({
      method: 'GET',
      url: '/api/tracks/' + id,
      success: function (track) {
        TrackActions.receiveSingleTrack(track);
        callback && callback();
      },
      error: function () {
        console.log("YOU DONE FUCKED UP IN ApiUtil#fetchSingleTrack");
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
        callback && callback(data.user_id);
      },
      error: function () {
        console.log("YOU DONE FUCKED UP IN ApiUtil#createPlaylist");
      }
    });
  },
  updatePlaylist: function (id, data) {
    $.ajax({
      type: 'PATCH',
      url: '/api/playlists/' + id,
      data: data,
      dataType: 'json',
      success: function (playlist) {
        PlaylistActions.receiveUpdatedPlaylist(playlist);
      },
      error: function () {
        console.log("YOU DONE FUCKED UP IN ApiUtil#updatePlaylist");
      }
    });
  },
  createTrack: function (data, callback) {
    $.ajax({
      type: 'POST',
      url: '/api/tracks',
      data: data,
      contentType: false,
      processData: false,
      dataType: 'json',
      success: function (track) {
        TrackActions.receiveTrackCreation(track);
        callback && callback(track.artist_id);
      },
      error: function () {
        console.log("YOU DONE FUCKED UP IN ApiUtil#createTrack");
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
      processData: false,
      contentType: false,
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
  updateUser: function (id, data, callback) {
    $.ajax({
      type: 'PATCH',
      url: '/api/users/' + id,
      processData: false,
      contentType: false,
      data: data,
      dataType: 'json',
      success: function (user) {
        UserActions.receiveUpdatedUser(user);
        callback && callback(user.id);
      },
      error: function () {
        console.log("YOU DONE FUCKED UP IN ApiUtil#updateUser");
      }
    });
  },
  getSearchResults: function (searchParams) {
    $.ajax({
      type: 'GET',
      url: '/api/track_search',
      data: searchParams,
      dataType: 'json',
      success: function (searchResults) {
        TrackActions.receiveSearchResults(searchResults);
      },
      error: function () {
        console.log("YOU DONE FUCKED UP IN ApiUtil#getSearchResults");
      }
    });
  },
  addTrackToPlaylist: function (params, callback) {
    $.ajax({
      type: 'POST',
      url: '/api/playlist_tracks',
      data: params,
      dataType: 'json',
      success: function (track) {
        PlaylistActions.receiveAddedTrack(track);
        callback && callback(track);
      },
      error: function () {
        console.log("YOU DONE FUCKED UP IN ApiUtil#addTrackToPlaylist");
      }
    });
  },
  multisearch: function (params, callback) {
    $.ajax({
      type: 'GET',
      url: '/api/searches',
      data: params,
      dataType: 'json',
      success: function (results) {
        SearchActions.receiveSearchResults(results);
        callback && callback();
      },
      error: function () {
        console.log("YOU DONE FUCKED UP IN ApiUtil#multisearch");
      }
    });
  },
  registerAddedTrack: function (playlist_id, track) {
    PlaylistActions.updateAddedTrack(playlist_id, track);
  },
  clearSearchResults: function () {
    TrackActions.clearSearchResults();
  },
  newTrackPlaying: function (id) {
    TrackActions.newTrackPlaying(id);
  }
};
