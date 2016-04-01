var React = require('react');
var UserHome = require('./user_home');
var NavBar = require('./navbar');
var ApiUtil = require('../util/api_util');

var App = React.createClass({
  render: function () {
    return (
      <div>
        <NavBar />
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
