class CommentSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  Rails.application.routes.default_url_options[:host] = '3000'

  attributes :id, :content, :account_name, :avatar_image

  def account_name
    object.user.account_name
  end

  def avatar_image
    rails_blob_path(object.user.avatar_image)
  end
end
