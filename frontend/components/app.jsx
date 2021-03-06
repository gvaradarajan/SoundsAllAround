var React = require('react');
var Modal = require('react-modal');
var UserHome = require('./user_home');
var NavBar = require('./navbar');
var ApiUtil = require('../util/api_util');

var App = React.createClass({
  componentWillMount: function (){
    //Modal.setAppElement('body');
  },
  render: function () {
    return (
      <div>
        <NavBar />
        <main className="content group">
          {this.props.children}
        </main>
      </div>
    );
  }
});

module.exports = App;
