json.extract! @track, :id, :title, :album_id, :artist_id
json.image @track.image
json.audio @track.audio
json.artist @track.artist.username
json.amplitudes @track.amplitudes
json.playlists @track.playlists.each do |playlist|
  json.extract! playlist, :id, :title, :description, :user_id
  json.creator playlist.user.username
  json.image playlist.tracks.first.image
end
