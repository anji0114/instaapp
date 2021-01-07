require 'rails_helper'

RSpec.describe Comment, type: :model do
  context 'contentが入力されている場合' do
    let!(:user) {create(:user)}
    let!(:article) { create(:article, user: user)}

    let!(:comment) {build(:comment, user: user, article: article)}
    it 'commentを保存できる' do
      expect(comment).to be_valid
    end
  end
end
