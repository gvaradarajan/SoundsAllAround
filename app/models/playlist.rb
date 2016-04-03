class Playlist < ActiveRecord::Base
  validates :user_id, :title, presence: true

  belongs_to :user

  has_many :playlist_tracks

  has_many :tracks, :through => :playlist_tracks
end
