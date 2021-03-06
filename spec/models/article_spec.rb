require 'rails_helper'

RSpec.describe Article, type: :model do

  context 'pictureが入力されている場合' do
    let!(:user) {create(:user)}

    let!(:article) {build(:article, user: user)}
    it '記事を保存できる' do
      binding.pry
      expect(article).to be_valid
    end
    # bundle exec rspec spec/models/article_spec.rb
  end
end