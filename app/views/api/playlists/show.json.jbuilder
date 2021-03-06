json.extract! @playlist, :id, :title, :description, :user_id
json.creator @playlist.user.username
json.image @playlist.tracks.first.image
json.tracks @playlist.tracks.each do |track|
  json.extract! track, :id, :title, :artist_id, :amplitudes
  json.artist track.artist.username
  json.image track.image
  json.audio track.audio
end
