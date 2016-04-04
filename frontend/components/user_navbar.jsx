var React = require('react');
var PropTypes = React.PropTypes;

var UserNav = React.createClass({

  render: function() {
    return (
      <header className="user-header group">
        <nav className="user-header-nav group">
          <ul className="nav-bar group">
            {welcomeMessage}
            {this.createSessionButton()}
          </ul>
        </nav>
      </header>
    );
  }

});

module.exports = UserNav;
