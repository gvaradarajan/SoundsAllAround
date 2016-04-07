json.array! @tracks do |track|
  json.extract! track, :id, :title, :album_id, :artist_id
  json.audio track.audio
  json.artist track.artist.username
end
