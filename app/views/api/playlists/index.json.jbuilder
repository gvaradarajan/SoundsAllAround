json.array! @playlists do |playlist|
  json.extract! playlist, :id, :title, :description
  json.creator playlist.user.username
  json.firstTrack playlist.tracks.first
  json.secondTrack playlist.tracks.second
  json.thirdTrack playlist.tracks.third
end
