json.playlist do
  json.extract! @playlist, :id, :title, :description, :user_id
  json.creator @playlist.user.username
end
