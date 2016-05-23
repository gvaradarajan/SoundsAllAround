class Api::SearchesController < ApplicationController

  def index
    result_docs = PgSearch.multisearch(search_params[:query])
    @tracks = []
    @playlists = []
    @users = []
    result_docs.each do |doc|
      case doc.searchable_type
      when "Track"
        @tracks.push(doc.searchable)
      when "User"
        @users.push(doc.searchable)
      when "Playlist"
        @playlists.push(doc.searchable)
      end
    end
  end

  def search_params
    params.require(:search).permit(:query)
  end
end
