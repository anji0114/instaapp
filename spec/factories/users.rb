FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    account_name { Faker::Name.name }
    password { 'password' }
  end
end