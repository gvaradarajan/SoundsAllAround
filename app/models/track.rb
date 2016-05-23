class Track < ActiveRecord::Base
  validates :title, :artist_id, presence: true

  has_attached_file :image, default_url: "https://s3.amazonaws.com/soundsallaround-pro/seeds/missing.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  has_attached_file :audio, default_url: "Chain_Jingle.mp3"
  #validates_attachment_presence :audio
  validates_attachment_content_type :audio, content_type: /\Aaudio\/.*\Z/


  belongs_to(
    :artist,
    class_name: "User",
    primary_key: :id,
    foreign_key: :artist_id
  )

  has_many :playlist_tracks

  has_many :playlists, :through => :playlist_tracks, :source => :playlist

  has_many :playlisted_users, :through => :playlists, :source => :user

  def artist_name
    self.artist.username
  end

  include PgSearch
  pg_search_scope(:search_tracks,
  :against => :title,
  :associated_against => { :artist => [:username] },
  :using => { :tsearch => {:prefix => true} })

  PgSearch.multisearch_options = {
    :using => [:tsearch, :trigram]
  }

  multisearchable :against => [:title, :artist_name]

  def self.rebuild_pg_search_documents
    connection.execute <<-SQL
     INSERT INTO pg_search_documents (searchable_type, searchable_id, content, created_at, updated_at)
       SELECT 'Track' AS searchable_type,
              tracks.id AS searchable_id,
              (tracks.title || ' ' || users.username) AS content,
              now() AS created_at,
              now() AS updated_at
       FROM tracks
       LEFT JOIN users
         ON users.id = tracks.artist_id
    SQL
  end


end
