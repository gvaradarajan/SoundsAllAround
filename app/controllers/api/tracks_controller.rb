class Api::TracksController < ApplicationController

  def index
    @tracks = Track.order(created_at: :desc)
  end

  def show
    @track = Track.includes(artist: :uploaded_tracks).find(params[:id])
  end

  def create
    @track = Track.new(track_params)
    if @track.save
      redirect_to "/api/tracks/#{@track.id}"
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
    params.require(:track).permit(:title, :artist_id)
  end

end
