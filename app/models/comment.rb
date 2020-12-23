class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :article

  after_create :send_mail

  def send_mail
    to_user = article.user
    if self.content.include?("@#{to_user.account_name}")
      CommentsMailer.new_comment(to_user, user).deliver_later
    end
  end
end
