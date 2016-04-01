var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var BrowserHistory = require('react-router').browserHistory;

var App = require('./components/app');
var UserHome = require('./components/user_home');
var Login = require('./components/login');
var PlaylistIndex = require('./components/playlist_index');
var Playlists = require('./components/all_playlists');
var Tracks = require('./components/all_tracks');
var SignUpForm = require('./components/sign_up');

var CurrentUserStore = require("./stores/current_user_store");

var ApiUtil = require('./util/api_util');

var _requireLoggedIn = function (nextState, replace, asyncCallback) {
  if (CurrentUserStore.currentUserFetched()) {
    _notLoggedInRedirect(replace, asyncCallback);
  }
  else {
    ApiUtil.fetchCurrentUser(_notLoggedInRedirect.bind(null, replace, asyncCallback));
  }
};

var _notLoggedInRedirect = function (replace, asyncCallback) {
  if (!CurrentUserStore.isLoggedIn()) {
    replace("/login");
  }
  asyncCallback();
};

var NotFound = React.createClass({
  render: function () {
    return <div>404 Not Found</div>;
  }
});

var routes = (
  <Route path="/" component={App}>
    <Route path="signup" component={SignUpForm} />
    <Route path="login" component={Login} />
    <Route path="users/:id" component={UserHome} onEnter={_requireLoggedIn}>
      <Route path="playlists" component={PlaylistIndex} />
    </Route>
    <Route path="playlists" component={Playlists} />
    <Route path="tracks" component={Tracks} />
    <Route path='*' component={NotFound} />
  </Route>
);

window.initializeSAA = function () {
  ReactDOM.render(
    <Router history={BrowserHistory}>{routes}</Router>,
    document.getElementById('root')
  );
};
