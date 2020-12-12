class Article < ApplicationRecord
  default_scope -> { order(created_at: :desc) }
  has_many_attached :pictures
  belongs_to :user
  validates :pictures, presence: true
  validate :validate_pictures


  private
  def validate_pictures
    return if pictures.count <= 4
    errors.add(:pictures, 'You can upload max 4 images')
  end
end
