class Track < ActiveRecord::Base
  validates :title, :artist_id, presence: true


  belongs_to(
    :artist,
    class_name: "User",
    primary_key: :id,
    foreign_key: :artist_id
  )

  has_many :playlists, :through => :playlist_tracks, :source => :playlist
end
