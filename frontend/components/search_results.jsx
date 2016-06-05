var React = require('react');
var PropTypes = React.PropTypes;
var ApiUtil = require('../util/api_util');
var SearchStore = require('../stores/search_store');

var PlaylistIndexItem = require('./playlist_index_item');
var TrackIndexItem = require('./track_index_item');
var UserIndexItem = require('./user_index_item');

var SearchResults = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  _fillResults: function (query) {
    this.setState({
      searchString: query,
      searchResults: { tracks: SearchStore.trackResults(),
                       playlists: SearchStore.playlistResults(),
                       users: SearchStore.userResults() }
    });
  },
  _onChange: function (e) {
    this.setState({
      searchString: e.currentTarget.value
    });
  },
  _onSearch: function (e) {
    if (this.state.searchString === undefined) return;
    e && e.preventDefault();
    var searchString = this.state.searchString;
    var router = this.context.router;
    router.push("/search?" + this.state.searchString);
  },
  getInitialState: function() {
    var query = Object.keys(this.props.location.query)[0];
    return {
      searchString: query,
      searchResults: { tracks: [],
                       playlists: [],
                       users: [] }
    };
  },
  componentDidMount: function() {
    var query = Object.keys(this.props.location.query)[0];
    var listener = this._fillResults.bind(this, query);
    this.listenerToken = SearchStore.addListener(listener);
    this._onSearch();
  },
  componentWillReceiveProps: function(nextProps) {
    var searchString = Object.keys(nextProps.location.query)[0];
    var searchParams = { search: { query: searchString } };
    ApiUtil.multisearch(searchParams, this._fillResults.bind(this, searchString));
  },
  trackResults: function () {
    var tracks = this.state.searchResults.tracks
    var trackItems = tracks && tracks.map(function (track) {
      return <TrackIndexItem key={track.id} orientation={"portrait"} track={track} />;
    });
    return (
      <ul className="all-tracks group">
        {trackItems}
      </ul>
    );
  },
  playlistResults: function () {
    var playlists = this.state.searchResults.playlists;
    var playlistItems = playlists && playlists.map(function (playlist) {
      return <PlaylistIndexItem key={playlist.id} playlist={playlist} />;
    });
    return (
      <ul className="playlists-index">
        {playlistItems}
      </ul>
    );
  },
  userResults: function () {
    var users = this.state.searchResults.users;
    var userItems = users && users.map(function (user) {
      return <UserIndexItem key={user.id} user={user} />;
    });
    return (
      <ul className="all-tracks group">
        {userItems}
      </ul>
    )
  },
  render: function() {
    var noResults = "No Results Found"
    var noTracks = this.state.searchResults.tracks.length === 0;
    var noPlaylists = this.state.searchResults.playlists.length === 0;
    var noUsers = this.state.searchResults.users.length === 0;
    return (
      <div>
        <header className="banner" />
        <h1 className="page-header">Search Results</h1>
        <form onSubmit={this._onSearch}>
          <label htmlFor="search" className="search label">Search: </label>
          <input type="text"
                 value={this.state.searchString}
                 onChange={this._onChange}
                 className="all-search-field"
                 id="search"/>
        </form>
        <h1 className="page-header">Tracks: {noTracks ? noResults : ""}</h1>
        {this.trackResults()}
        <h1 className="page-header">Playlists: {noPlaylists ? noResults : ""}</h1>
        {this.playlistResults()}
        <h1 className="page-header">Artists: {noUsers ? noResults : ""}</h1>
        {this.userResults()}
      </div>
    );
  }

});

module.exports = SearchResults;
