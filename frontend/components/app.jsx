var React = require('react');
var UserHome = require('./user_home');

var App = React.createClass({
  render: function () {
    var id = 4;
    return (
      <div>
      <UserHome id={id} />
      </div>
    );
  }
});

module.exports = App;
