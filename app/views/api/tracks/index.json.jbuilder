json.array! @tracks do |track|
  json.extract! track, :id, :title, :album_id, :artist_id
  json.audio track.audio
  json.image track.image
  json.artist track.artist.username
end
