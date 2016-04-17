class Track < ActiveRecord::Base
  validates :title, :artist_id, presence: true

  has_attached_file :image, default_url: "https://s3.amazonaws.com/soundsallaround-pro/seeds/missing.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  has_attached_file :audio, default_url: "Chain_Jingle.mp3"
  #validates_attachment_presence :audio
  validates_attachment_content_type :audio, content_type: /\Aaudio\/.*\Z/

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

  has_many :playlisted_users, :through => :playlists, :source => :user
end
