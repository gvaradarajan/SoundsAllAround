var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var BrowserHistory = require('react-router').browserHistory;

var App = require('./components/app');
var Home = require('./components/home');
var UserHome = require('./components/user_home');
var Login = require('./components/login');
var Playlist = require('./components/playlist');
var PlaylistIndex = require('./components/playlist_index');
var Playlists = require('./components/all_playlists');
var Track = require('./components/track');
var TrackIndex = require('./components/user_track_index');
var Tracks = require('./components/all_tracks');
var UserChart = require('./components/user_chart');
var SearchTracksForm = require('./components/search_tracks_form');
var SearchResults = require('./components/search_results');
var SignUpForm = require('./components/sign_up');

var CurrentUserStore = require("./stores/current_user_store");

var ApiUtil = require('./util/api_util');

var _requireLoggedIn = function (nextState, replace, asyncCallback) {
  var intendedPath = nextState.location.pathname;
  if (!CurrentUserStore.currentUserFetched()) {
    if (intendedPath.includes("/users")) {
      // ApiUtil.fetchCurrentUser(_rerouteProfileView.bind(null, nextState, replace, asyncCallback));
      ApiUtil.fetchCurrentUser(_notLoggedInRedirect.bind(null, nextState, replace, asyncCallback));
    }
    else {
      ApiUtil.fetchCurrentUser(_notLoggedInRedirect.bind(null, nextState, replace, asyncCallback));
    }
  }
  asyncCallback();
};

var _notLoggedInRedirect = function (nextState, replace, asyncCallback) {
  var intendedPath = nextState.location.pathname;
  if (!CurrentUserStore.isLoggedIn()) {
    replace(intendedPath);
  }
  else {
    var id = CurrentUserStore.currentUser().id;
    if (intendedPath === "/") {
      replace("/users/" + id);
    }
    else {
      replace(intendedPath);
    }
  }
  asyncCallback();
};

var _rerouteProfileView = function (nextState, replace, asyncCallback) {
  var intendedPath = nextState.location.pathname;
  if (intendedPath.split("/").length == 3) {
    var id = CurrentUserStore.currentUser() && CurrentUserStore.currentUser().id;
    var profileId = parseInt(intendedPath.split("/").pop());
    if (!CurrentUserStore.isLoggedIn() || id !== profileId) {
      replace(intendedPath + "/playlists");
    }
    else {
      replace(intendedPath);
    }
  }
  else {
    replace(intendedPath);
  }
  asyncCallback();
};

var NotFound = React.createClass({
  render: function () {
    return <div>404 Not Found</div>;
  }
});

// onEnter={_requireLoggedIn}

var routes = (
  <Route path="/" component={App} onEnter={_requireLoggedIn}>
    <IndexRoute component={Home} />
    <Route path="signup" component={SignUpForm} />
    <Route path="login" component={Login} />
    <Route path="users/:id" component={UserHome}>
      <IndexRoute component={UserChart} />
      <Route path="playlists" component={PlaylistIndex} />
      <Route path="tracks" component={TrackIndex} />
    </Route>
    <Route path="playlists/:id" component={Playlist} />
    <Route path="tracks/:id" component={Track} />
    <Route path="search" component={SearchResults} />
    <Route path="all_playlists" component={Playlists} />
    <Route path='*' component={NotFound} />
  </Route>
);

window.initializeSAA = function () {
  ReactDOM.render(
    <Router history={BrowserHistory}>{routes}</Router>,
    document.getElementById('root')
  );
};
