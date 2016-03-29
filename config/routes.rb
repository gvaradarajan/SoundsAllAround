Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :show]
  end

  resources :users, only: [:new, :create]

  resource :session, only: [:create, :destroy, :new]

  root :to => 'static_pages#root'

end
