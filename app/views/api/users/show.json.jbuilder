json.extract! @user, :id, :username, :email
json.image @user.image
json.playlists @user.playlists.each do |playlist|
  json.extract! playlist, :id, :title, :description, :user_id
  json.creator playlist.user.username
  json.image playlist.tracks.first.image
end
json.tracks @user.uploaded_tracks.each do |track|
  json.extract! track, :id, :title, :artist_id
  json.image track.image
  json.audio track.audio
end
