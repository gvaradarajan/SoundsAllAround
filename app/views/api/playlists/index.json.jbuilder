json.array! @playlists do |playlist|
  json.extract! playlist, :id, :title, :description
  json.artist playlist.user.username
end
