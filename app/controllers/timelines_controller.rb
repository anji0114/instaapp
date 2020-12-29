class TimelinesController < ApplicationController
  before_action :authenticate_user!
  def show
    user_ids = current_user.followings.pluck(:id)
    @articles = Article.where(created_at: 24.hours.ago..Time.now, user_id: user_ids)
    # @articles = Article.find(Like.group(:article_id).order('count(article_id) desc').limit(3).pluck(:article_id))
  end
end