json.extract! @user, :id, :username, :email
json.playlists @user.playlists
json.tracks @user.uploaded_tracks
