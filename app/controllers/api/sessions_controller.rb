class Api::SessionsController < ApplicationController

  def show
    if current_user
      render "/api/users/#{current_user.id}"
    else
      render text: "AIN'T NOBODY HERE"
    end
  end

  def create
    user = User.find_by_credentials(user_params[:email], user_params[:password])
    if user.nil?
      #flash[:errors] = ["Invalid Credentials"]
      render json: { message: "YOU AIN'T ALLOWED!" }, status: 401
    else
      login_user(user)
      redirect_to "/api/users/#{user.id}"
    end
  end

  def destroy
    logout!
    render json: {}
  end

end
