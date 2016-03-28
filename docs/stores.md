# Flux Stores

### TrackStore

Holds all persisted track data.

##### Actions:
- `receiveAllTracks`
- `receiveLikedTracks`
- `receiveSingleTrack`
- `removeTrack`

##### Listeners:
- `AllTrackIndex` (passes to `TrackIndexItem` via props)
- `FollowedTrackIndex` (passes to `LandscapeTrackItem` via props)
- `LikedTrackIndex` (passes to `TrackIndexItem` via props)
- `PlaylistIndexItem` (passes to `LandscapeTrackItem` via props) 

### TrackUploadStore

Holds un-persisted track data to send to the API.

##### Actions:
- `receiveTrackUploadParams`

##### Listeners:
- `TrackUploadForm`

### PlaylistStore

Holds all persisted playlist data.

##### Actions:
- `receiveAllPlaylists`
- `receiveSinglePlaylist`
- `removePlaylist`

##### Listeners:
- `PlaylistIndex`

### PlaylistFormStore

Holds un-persisted playlist data to send to the API.

##### Actions:
- `receivePlaylistFormParams`

##### Listeners:
- `PlaylistForm`

### SearchStore

Holds search parameters to send to the API.

##### Actions:
- `receiveSearchParams`

##### Listeners:
- `SearchIndex`

### SearchSuggestionStore

Holds typeahead suggestions for search.

##### Actions:
- `receiveSearchSuggestions`

##### Listeners:
- `SearchSuggestions`
