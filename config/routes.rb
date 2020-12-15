Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'articles#index'
  resource :profile, only: [:show, :update]

  resources :articles do
    resource :like, only: [:show, :create, :destroy]
  end
end
