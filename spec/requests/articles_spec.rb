require 'rails_helper'

RSpec.describe 'Articles', type: :request do
  let!(:user) { create(:user)}
  let!(:article) { create_list(:article, 3, user: user) }
  describe 'GET /articles' do
    it '200ステータスが帰ってくる' do
      get articles_path
      expect(response).to have_http_status(200)
    end
  end

  describe 'POST /articles' do
    context 'ログインしていない場合' do

      it 'ログイン画面に遷移' do
        article_params = attributes_for(:article)
        post articles_path(article: article_params)
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
  # bundle exec rspec spec/requests/articles_spec.rb
end
