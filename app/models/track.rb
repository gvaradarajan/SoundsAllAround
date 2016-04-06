class Track < ActiveRecord::Base
  validates :title, :artist_id, presence: true
  include PgSearch
  pg_search_scope(:search_tracks,
                  :against => :title,
                  :associated_against => { :artist => [:username] },
                  :using => { :tsearch => {:prefix => true} })

  belongs_to(
    :artist,
    class_name: "User",
    primary_key: :id,
    foreign_key: :artist_id
  )

  has_many :playlist_tracks

  has_many :playlists, :through => :playlist_tracks, :source => :playlist
end
