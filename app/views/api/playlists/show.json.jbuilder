json.playlist do
  json.extract! @playlist, :id, :title, :description
  json.artist @playlist.user.username
end
