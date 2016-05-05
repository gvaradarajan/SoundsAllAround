json.array! @playlists do |playlist|
  json.extract! playlist, :id, :title, :description
  json.creator playlist.user.username
  json.image playlist.tracks.first.image
end
