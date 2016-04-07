json.extract! @user, :id, :username, :email
json.image @user.image
json.playlists @user.playlists
json.tracks @user.uploaded_tracks.each do |track|
  json.extract! track, :id, :title, :artist_id
  json.audio track.audio
end
