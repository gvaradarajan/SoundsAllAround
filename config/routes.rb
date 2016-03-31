Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :show]
    resources :playlists, only: [:create, :destroy, :index, :show, :update]
    resources :tracks, only: [:create, :destroy, :index, :show, :update]
  end

  resources :users, only: [:new, :create]

  resource :session, only: [:create, :destroy, :new]

  root :to => 'static_pages#root'

  get '*unmatched_route', to: 'static_pages#root'

end
