class Api::TracksController < ApplicationController

  def index
    @tracks = Track.order(created_at: :desc)
  end

  def show
    @track = Track.includes(artist: :uploaded_tracks)
                  .includes(playlists: :tracks)
                  .find(params[:id])
  end

  def create
    @track = Track.new(track_params)
    if @track.save
      render :show
    else
      render @track.errors.full_messages, status: 422
    end
  end

  def update
  end

  def destroy
  end

  private

  def track_params
    params.require(:track).permit(:title, :artist_id, :audio, :image)
  end

end
