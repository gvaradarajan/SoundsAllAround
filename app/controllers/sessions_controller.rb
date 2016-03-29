class SessionsController < ApplicationController

  def new
    if current_user
      redirect_to root_url
    else
      render :new
    end
  end

  def create
    user = User.find_by_credentials(user_params[:email], user_params[:password])
    if user.nil?
      flash[:errors] = ["Invalid Credentials"]
      render :new
    else
      login_user(user)
      redirect_to root_url
    end
  end

  def destroy
    logout!
    redirect_to root_url
  end

end
