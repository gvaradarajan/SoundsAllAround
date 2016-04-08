json.extract! @track, :id, :title, :album_id, :artist_id
json.image @track.image
json.audio @track.audio
json.artist @track.artist.username
json.playlists @track.playlists
