class Api::TracksController < ApplicationController

  def index
  end

  def show
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
