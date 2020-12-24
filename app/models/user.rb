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
  has_many :comments, dependent: :destroy

  has_many :following_relationships, foreign_key: 'follower_id', class_name: 'Relationship', dependent: :destroy
  has_many :followings, through: :following_relationships, source: :following

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

  def follow!(user)
    following_relationships.create!(following_id: user.id)
  end
end
