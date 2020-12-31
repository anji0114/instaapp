class FollowsController < ApplicationController
  before_action :authenticate_user!
  def show
    user = User.find(params[:account_id])
    follow_status = current_user.has_followed?(user)
    render json: { hasFollowed: follow_status}
  end

  def create
    current_user.follow!(params[:account_id])
    followers_count = User.find(params[:account_id]).followers.count
    render json: { status: 'ok', followersCount: followers_count }
  end
end