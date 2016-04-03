class Track < ActiveRecord::Base
  validates :title, :artist_id, presence: true
  include PgSearch
  pg_search_scope :search_by_title, :against => :title
  pg_search_scope :search_by_artist, :associated_against => { :artist => :username }

  belongs_to(
    :artist,
    class_name: "User",
    primary_key: :id,
    foreign_key: :artist_id
  )

  has_many :playlists, :through => :playlist_tracks, :source => :playlist
end
