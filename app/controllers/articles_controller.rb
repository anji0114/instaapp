class ArticlesController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create, :destroy]
  def index
    @articles = Article.all
  end

  def show
    @article = Article.find(params[:id])
  end

  def new
    @article = current_user.articles.build
  end

  def create
    @article = current_user.articles.build(article_params)
    if @article.save
      redirect_to root_path, notice: '保存しました'
    else
      flash.now[:error] = '保存に失敗しました'
      render :new
    end
  end

  def destroy
    article = current_user.articles.find(params[:id])
    article.destroy!
    redirect_to root_path, notice:'削除に成功しました'
  end

  private
  def article_params
    params.require(:article).permit(:content, pictures: [])
  end
end
