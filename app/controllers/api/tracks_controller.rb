class Api::TracksController < ApplicationController

  def index
    @tracks = Track.order(created_at: :desc)
  end

  def show
    @track = Track.includes(artist: :uploaded_tracks).find(params[:id])
  end

  def create

  end

  def update
  end

  def destroy
  end

  private

  def track_params
    params.require(:track).permit(:title)
  end

end
