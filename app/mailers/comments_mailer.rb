class CommentsMailer < ApplicationMailer
  def new_comment(user, reply_user)
    @user = user
    @reply_user = reply_user
    mail to: @user.email, subject: '[お知らせ] コメントが届いています'
  end
end