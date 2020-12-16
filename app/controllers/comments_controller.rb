class CommentsController < ApplicationController
  def index
    @article = Article.find(params[:article_id])
    @comments = @article.comments.all
  end

  def new
    @comment = current_user.comments.build
    @article = Article.find(params[:article_id])
  end

  def create
    @article = Article.find(params[:article_id])
    @comment = current_user.comments.build(comment_params)
    if @comment.save
      redirect_to article_comments_path(@article)
    else
      flash.now[:error] = '更新できませんでした'
      render :new
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:content).merge(article_id: params[:article_id])
  end
end
