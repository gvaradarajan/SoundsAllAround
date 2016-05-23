json.tracks @tracks do |track|
  json.extract! track, :id, :title, :album_id, :artist_id
  json.audio track.audio
  json.image track.image
  json.artist track.artist.username
end
json.users @users do |user|
  json.extract! user, :id, :username
  json.image user.image
end
json.playlists @playlists do |playlist|
  json.extract! playlist, :id, :title, :description
  json.creator playlist.user.username
  json.image playlist.tracks.first.image
end
