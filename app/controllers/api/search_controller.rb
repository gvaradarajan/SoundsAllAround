class Api::SearchController < ApplicationController

  def index
    @tracks = Track.search_tracks(search_params[:query])
  end

  private

  def search_params
    params.require(:search).permit(:query)
  end
end
