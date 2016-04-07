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
var UserOverview = require('./components/user_overview');
var SearchTracksForm = require('./components/search_tracks_form');
var SignUpForm = require('./components/sign_up');

var CurrentUserStore = require("./stores/current_user_store");

var ApiUtil = require('./util/api_util');

var _requireLoggedIn = function (nextState, replace, asyncCallback) {
  if (!CurrentUserStore.currentUserFetched()) {
    ApiUtil.fetchCurrentUser(_notLoggedInRedirect.bind(null, nextState, replace, asyncCallback));
  }
  asyncCallback();
};

var _notLoggedInRedirect = function (nextState, replace, asyncCallback) {
  var intendedPath = nextState.location.pathname;
  if (!CurrentUserStore.isLoggedIn()) {
    replace(intendedPath);
  }
  else {
    if (intendedPath === "/") {
      var id = CurrentUserStore.currentUser().id;
      replace("/users/" + id);
    }
    else {
      replace(intendedPath);
    }
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
    <Route path="users/:id" component={UserHome} >
      <IndexRoute component={UserOverview} />
      <Route path="playlists" component={PlaylistIndex} />
      <Route path="tracks" component={TrackIndex} />
    </Route>
    <Route path="playlists/:id" component={Playlist} />
    <Route path="tracks/:id" component={Track} />
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
