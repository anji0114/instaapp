class Article < ApplicationRecord
  default_scope -> { order(created_at: :desc) }

  validates :pictures, presence: true
  validate :validate_pictures
  validates :content, length: { maximum: 100 }

  belongs_to :user

  has_many_attached :pictures
  has_many :likes,    dependent: :destroy
  has_many :comments, dependent: :destroy

  def like_count
    likes.count
  end

  private
  def validate_pictures
    return if pictures.count <= 10
    errors.add(:pictures, 'You can upload max 10 pictuers')
  end
end
