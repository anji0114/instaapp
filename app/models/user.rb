class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :account_name, uniqueness: true
  validates :account_name, presence: true

  has_one :profile, dependent: :destroy

  has_many :articles, dependent: :destroy
  has_many :likes,    dependent: :destroy

  def prepare_profile
    profile || build_profile
  end

  def has_liked?(article)
    likes.exists?(article_id: article.id)
  end

  def has_written?(article)
    articles.exists?(id: article.id)
  end

  def avatar_image
    if profile&.avatar&.attached?
      profile.avatar
    else
      'default-avatar.png'
    end
  end
end
