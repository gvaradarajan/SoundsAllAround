var React = require('react');
var Modal = require('react-modal');
var PropTypes = React.PropTypes;
var UserStore = require('../stores/user_store');
var CurrentUserStore = require('../stores/current_user_store');
var modalStyleOptions = require('../constants/modal_constants').uploadphoto;
var ApiUtil = require('../util/api_util');
var UserNav = require('./user_navbar');
var UploadPhotoForm = require('./upload_photo_form');

var UserHome = React.createClass({
  getInitialState: function () {
    return { user: UserStore.find(this.props.params.id), uploadModalIsOpen: false };
  },
  _onChange: function () {
    this.setState ({ user: UserStore.find(this.props.params.id) });
  },
  componentWillReceiveProps: function (newProps) {
    ApiUtil.fetchSingleUser(newProps.params.id);
  },
  componentWillMount: function () {
    Modal.setAppElement(document.body);
  },
  componentDidMount: function () {
    this.listenerToken = UserStore.addListener(this._onChange);
    ApiUtil.fetchSingleUser(this.props.params.id);
  },
  componentWillUnmount: function () {
    this.listenerToken.remove();
  },
  openModal: function () {
    this.setState({ uploadModalIsOpen: true });
  },
  closeModal: function () {
    this.setState({ uploadModalIsOpen: false });
  },
  generateUploadModal: function () {
    var modal = "";
    var currUser = CurrentUserStore.isLoggedIn();
    var currentUserId = currUser ? CurrentUserStore.currentUser().id : NaN;
    var pageUserId = this.props.params.id;
    pageUserId = pageUserId || NaN;
    if (currentUserId == pageUserId) {
      modal = <Modal isOpen={this.state.uploadModalIsOpen}
             onRequestClose={this.closeModal}
             style={modalStyleOptions}
             closeTimeoutMS={150}>
                <UploadPhotoForm id={this.props.params.id} fxn={this.closeModal} />
              </Modal>;
    }
    return modal;
  },
  generateUploadPhotoButton: function () {
    var button = "";
    var currUser = CurrentUserStore.isLoggedIn();
    var currentUserId = currUser ? CurrentUserStore.currentUser().id : NaN;
    var pageUserId = this.props.params.id;
    pageUserId = pageUserId || NaN;
    if (currentUserId == pageUserId) {
      button = <button className="upload-profile-pic"
                  onClick={this.openModal}>Upload Photo</button>;
    }
    return button;
  },
  render: function() {
    var name = this.state.user ? this.state.user.username : "";
    return (
      <div className="user-profile">
        <header className="user-banner banner">
          <h1 className="user-heading">{name}</h1>
          {this.generateUploadPhotoButton()}
          <img className="profile-pic home-profile-pic" src={this.state.user ? this.state.user.image : ""} />
        </header>
        <UserNav user={this.state.user}/>
        {this.generateUploadModal()}
        {this.props.children}
      </div>
    );
  }

});


module.exports = UserHome;
