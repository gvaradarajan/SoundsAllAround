class Api::PlaylistsController < ApplicationController
  def index
    @playlists = Playlist.includes(user: :playlists).includes(tracks: :playlists).all
  end

  def show
    @playlist = Playlist.includes(:tracks).find(params[:id])
  end

  def create
    @playlist = Playlist.new(playlist_params[:creation_params])
    initial_track_id = playlist_params[:track_id]
    if @playlist.save
      PlaylistTrack.create(playlist_id: @playlist.id, track_id: initial_track_id)
      redirect_to "/api/playlists/#{@playlist.id}"
    else
      render @playlist.errors.full_messages, status: 422
    end
  end

  def update
    # debugger
    @playlist = Playlist.includes(tracks: :playlists).find(params[:id])
    if @playlist.update(playlist_params[:creation_params])
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
    #params.require(:playlist).permit(:title, :description, :user_id)
    params.require(:playlist)
          .permit(:track_id, :creation_params => [:title, :description, :user_id])

  end
end
