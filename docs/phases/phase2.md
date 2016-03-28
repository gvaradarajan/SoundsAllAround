# Phase 2: Flux Architecture and Note CRUD (2 days)

## Rails
### Models
* Playlist
* Track

### Controllers
* Api::PlaylistsController (create, destroy, index, show, update)
* Api::TracksController (index, show, update(with playlist_id temporarily))

### Views

## Flux
### Views (React Components)
* PlaylistIndex
  - PlaylistsIndexItem
* AllTrackIndex
	-TrackIndexItem

### Stores
* Track
* Playlist

### Actions
* ApiActions.receiveAllPlaylists -> triggered by ApiUtil
* ApiActions.receiveSinglePlaylist
* ApiActions.deletePlaylist
* ApiActions.receiveAllTracks -> triggered by ApiUtil
* ApiActions.receiveSingleTrack
* TrackActions.fetchAllTracks -> triggers ApiUtil
* TrackActions.fetchSingleTrack -> triggers ApiUtil
* PlaylistActions.fetchAllPlaylists -> triggers ApiUtil
* PlaylistActions.fetchSinglePlaylist
* PlaylistActions.createPlaylist
* PlaylistActions.editPlaylist
* PlaylistActions.destroyPlaylist

### ApiUtil
* ApiUtil.fetchAllTracks
* ApiUtil.fetchSingleTrack
* ApiUtil.fetchAllPlaylists
* ApiUtil.fetchSinglePlaylist
* ApiUtil.createPlaylist
* ApiUtil.editPlaylist
* ApiUtil.destroyPlaylist

## Gems/Libraries
* Flux Dispatcher (npm)
