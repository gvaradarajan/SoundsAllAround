class PlaylistTrack < ActiveRecord::Base
  validates :playlist_id, :track_id, presence: true
  validates_uniqueness_of :playlist_id, scope: :track_id

  belongs_to :track
  belongs_to :playlist
end
