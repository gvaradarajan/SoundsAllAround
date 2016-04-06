json.extract! @user, :id, :username, :email
json.image @user.image
json.playlists @user.playlists
json.tracks @user.uploaded_tracks
