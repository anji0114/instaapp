FactoryBot.define do
  factory :article do
    content { Faker::Lorem.characters(number: 10) }
    after(:build) do |article|
      article.pictures.attach(io: File.open(Rails.root.join('spec', 'fixtures', 'test.jpeg')), filename: 'test.jpeg', content_type: 'image/jpeg')
    end
  end
end