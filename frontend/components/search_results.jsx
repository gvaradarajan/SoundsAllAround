var React = require('react');
var PropTypes = React.PropTypes;
var ApiUtil = require('../util/api_util');
var SearchStore = require('../stores/search_store');

var PlaylistIndexItem = require('./playlist_index_item');
var TrackIndexItem = require('./track_index_item');

var SearchResults = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  _fillResults: function (query) {
    // debugger
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
    var searchParams = { search: { query: searchString } };
    ApiUtil.multisearch(searchParams, this._fillResults.bind(this, searchString));
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
    // debugger
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
    var playlists = this.state.searchResults.playlists
    var playlistItems = playlists && playlists.map(function (playlist) {
      return <PlaylistIndexItem key={playlist.id} playlist={playlist} />;
    });
    return (
      <ul className="playlists-index">
        {playlistItems}
      </ul>
    );
  },
  render: function() {
    return (
      <div>
        <h1 className="page-header">Search Results</h1>
        <form onSubmit={this._onSearch}>
          <label htmlFor="search" className="search label">Search: </label>
          <input type="text"
                 value={this.state.searchString}
                 onChange={this._onChange}
                 className="all-search-field"
                 id="search"/>
        </form>
        <h1 className="page-header">Tracks: </h1>
        {this.trackResults()}
        <h1 className="page-header">Playlists: </h1>
        {this.playlistResults()}
        <h1 className="page-header">Artists: </h1>
        <ul>

        </ul>
      </div>
    );
  }

});

module.exports = SearchResults;
