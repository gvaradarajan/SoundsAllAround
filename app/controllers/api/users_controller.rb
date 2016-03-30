class Api::UsersController < ApplicationController

  def index
    @users = User.all
  end

  def show
    @user = User.includes(playlists: :user)
                .includes(uploaded_tracks: :artist)
                .find(params[:id])
  end

end
