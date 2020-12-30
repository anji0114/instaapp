class UnfollowsController < ApplicationController
  before_action :authenticate_user!
  def create
    current_user.unfollow!(params[:account_id])
    followers_count = User.find(params[:account_id]).followers.count
    render json: { status: 'ok', followersCount: followers_count }
  end
end