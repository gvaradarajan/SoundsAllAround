var React = require('react');
var PropTypes = React.PropTypes;
var CurrentUserStore = require('../stores/current_user_store');

var UserNav = React.createClass({
  _generateLink: function (string) {
    var title = string.charAt(0).toUpperCase() + string.slice(1);
    var pageUserId = this.props.user && this.props.user.id;
    return <li key={string}><a href={"/users/" + pageUserId + "/" + string}>{title}</a></li>;
  },
  render: function() {
    var pageUserId = this.props.user && this.props.user.id;
    var currentUserId = CurrentUserStore.isLoggedIn() && CurrentUserStore.currentUser().id;
    var tabs = ["playlists", "tracks"];
    // var tabs = ["playlists", "tracks", "follows", "likes"];
    var links = tabs.map(this._generateLink);
    return (
      <header className="user-header group">
        <nav className="user-header-nav group">
          <ul className="user-nav-bar group">
            <li><a href={"/users/" + pageUserId}>Overview</a></li>
            {links}
          </ul>
        </nav>
      </header>
    );
  }

});

module.exports = UserNav;
