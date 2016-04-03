class Api::PlaylistsController < ApplicationController
  def index
    @playlists = Playlist.includes(user: :playlists).includes(tracks: :tracks).all
  end

  def show
    @playlist = Playlist.includes(:tracks).find(params[:id])
  end

  def create
    @playlist = Playlist.new(playlist_params)
    if @playlist.save
      redirect_to "/api/playlists/#{@playlist.id}"
    else
      render @playlist.errors.full_messages, status: 422
    end
  end

  def update
    @playlist = Playlist.find(params[:id])
    if @playlist.update(playlist_params)
      render :show
    else
      render @playlist.errors.full_messages, status: 422
    end
  end

  def destroy
    @playlist = Playlist.find(params[:id])
    id = @playlist.user_id
    @playlist.destroy
    render json: id
  end

  private

  def playlist_params
    params.require(:playlist).permit(:title, :description, :user_id)
  end
end
