class Api::PlaylistTracksController < ApplicationController

  def create
    @playlist_track = PlaylistTrack.new(playlist_track_params)
    if @playlist_track.save
      id = @playlist_track.track.id
      # debugger
      redirect_to "/api/tracks/#{id}"
    else
      render @playlist_track.errors.full_messages, status: 422
    end
  end

  def destroy
    @playlist_track = PlaylistTrack.find_by(playlist_track_params)
    id = @playlist_track.playlist_id
    @playlist_track.destroy
    render json: id
  end

  private

  def playlist_track_params
    params.require(:playlisttrack).permit(:playlist_id, :track_id)
  end

end
