json.array! @playlists do |playlist|
  json.extract! playlist, :id, :title, :description
  json.user playlist.user.username
end
