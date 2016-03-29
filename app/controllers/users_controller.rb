class UsersController < ApplicationController

  def new
    if current_user
      redirect_to root_url
    else
      render :new
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login_user(@user)
      redirect_to root_url
    else
      flash[:errors] = ["Invalid Credentials"]
      render :new
    end
  end

end
