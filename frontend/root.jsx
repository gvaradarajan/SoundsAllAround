var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var BrowserHistory = require('react-router').browserHistory;

var App = require('./components/app');
var UserHome = require('./components/user_home');
var PlaylistIndex = require('./components/playlist_index');

var NotFound = React.createClass({
  render: function () {
    return <div></div>;
  }
});

var routes = (
  <Route path="/" component={App}>
    <Route path="users/:id" component={UserHome}>
      <Route path="playlists" component={PlaylistIndex} />
    </Route>
    <Route path='*' component={NotFound} />
  </Route>
);

window.initializeSAA = function () {
  ReactDOM.render(
    <Router history={BrowserHistory}>{routes}</Router>,
    document.getElementById('root')
  );
};
