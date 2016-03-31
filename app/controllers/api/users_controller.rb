class Api::UsersController < ApplicationController

  def index
    @users = User.all
  end

  def show
    @user = User.includes(playlists: :user)
                .includes(uploaded_tracks: :artist)
                .find(params[:id])
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login_user(@user)
      redirect_to "/api/users/#{@user.id}"
    else
      render json: { message: "Invalid Credentials" }, status: 422
    end
  end

end
