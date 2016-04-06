class Api::PlaylistTracksController < ApplicationController

  def create
    @playlist_track = PlaylistTrack.new(playlist_track_params)
  end

  def destroy
    @playlist_track = PlaylistTrack.find_by(playlist_track_params)
    @playlist_track.destroy
  end

  private

  def playlist_track_params
    params.require(:playlisttrack).permit(:playlist_id, :track_id)
  end

end
