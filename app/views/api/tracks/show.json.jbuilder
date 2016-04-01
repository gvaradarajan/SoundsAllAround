json.extract! @track, :id, :title, :album_id, :artist_id
json.artist @track.artist.username
