json.extract! @playlist, :id, :title, :description, :user_id
json.creator @playlist.user.username
json.tracks @playlist.tracks.each do |track|
  json.extract! track, :id, :title, :artist_id
  json.artist track.artist.username
  json.image track.image
  json.audio track.audio
end
