class CommentsController < ApplicationController
  def index
    @article = Article.find(params[:article_id])
  end
end
