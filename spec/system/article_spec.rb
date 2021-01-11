require 'rails_helper'

RSpec.describe 'Article', type: :system do
  let!(:user) { create(:user) }
  let!(:articles) { create_list(:article, 3, user: user) }

  it '記事一覧が表示される' do
    visit root_path
    articles.each do |article|
      expect(page).to have_css('.article_content', text: article.content)
    end
  end

  context 'ログインしている場合' do
    before do
      sign_in user
    end
    it '記事作成ぺージを表示できる' do
      visit root_path
      find('.float_btn').click
      expect(page).to have_css('.post-header')
    end

    it 'いいねの表示が変わる' do
      visit root_path
      first('.inactive-heart').click
      expect(page).to have_css('.active-heart')
    end

    it 'いいねを解除' do
      visit root_path
      first('.inactive-heart').click
      first('.active-heart').click
      expect(page).to have_css('.inactive-heart')
    end

    it 'コメントぺージに移動' do
      visit root_path
      first('.comment-btn').click
      expect(page).to have_css('.comments')
    end

    it 'アカウントページに移動' do
      visit root_path
      first('.user-avatar').click
      expect(page).to have_css('.profile')
    end

    it 'タイムラインページに移動' do
      visit root_path
      find('.dropdwon').hover
      find('.timeline-btn').click
      expect(page).to have_css('.timeline')
    end

    it 'プロフィールに移動' do
      visit root_path
      find('.dropdwon').hover
      find('.profile-btn').click
      expect(page).to have_css('.account_name', text: user.account_name)
    end
  end

  context 'ログインしていない場合' do
    #記事作成ぺージに関するテスト
    it 'ログインページに移動' do
      visit root_path
      find('.float_btn').click
      expect(page).to have_css('.login_page_image')
    end
  end
end
# bundle exec rspec spec/system/article_spec.rb