var React = require('react');
var PropTypes = React.PropTypes;

var UserIndexItem = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  linkToUserShow: function ()  {
    var router = this.context.router;
    router.push("/users/" + this.props.user.id);
  },
  render: function() {
    var userID = this.props.user && this.props.user.id;
    var username = this.props.user && this.props.user.username;
    var image = this.props.user && this.props.user.image;
    return (
      <li className="track-portrait group" id={userID}>
        <img className="track-img" src={image}
              onClick={this.linkToUserShow} />
        <div className="track-info">
          <h1><a onClick={this.linkToUserShow}>{username}</a></h1>
        </div>
      </li>
    );
  }

});

module.exports = UserIndexItem;
