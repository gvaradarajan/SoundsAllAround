class Playlist < ActiveRecord::Base
  validates :user_id, :title, presence: true

  include PgSearch

  multisearchable :against => [:title, :description]

  belongs_to :user

  has_many :playlist_tracks

  has_many :tracks, :through => :playlist_tracks
end
