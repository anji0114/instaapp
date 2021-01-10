class CommentSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  Rails.application.routes.default_url_options[:host] = '3000'

  attributes :id, :content, :account_name, :avatar_image

  def account_name
    object.user.account_name
  end

  def avatar_image
    if object.user.profile&.avatar&.attached?
      rails_blob_path(object.user.avatar_image)
    else
      "/assets/default-avatar-12a3f7379a4333007fa16fb67297f8a31c88580ccdaf11eb0be7323847c5641a.png"
    end
  end
end