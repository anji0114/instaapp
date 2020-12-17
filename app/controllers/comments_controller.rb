class CommentsController < ApplicationController
  before_action :set_article, only: [:index, :new, :create]
  def index
    @comments = @article.comments

    render json: @comments
  end

  def new
    @comment = current_user.comments.build
  end

  def create
    @comment = current_user.comments.build(comment_params)
    if @comment.save
      redirect_to article_comments_path(@article)
    else
      flash.now[:error] = '更新できませんでした'
      render :new
    end
  end

  private
  def set_article
    @article = Article.find(params[:article_id])
  end

  def comment_params
    params.require(:comment).permit(:content).merge(article_id: params[:article_id])
  end
end
