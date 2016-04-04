Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :show, :create]
    resource :session, only: [:create, :destroy, :show]
    resources :search, only: :index
    resources :playlists, only: [:create, :destroy, :index, :show, :update]
    resources :tracks, only: [:create, :destroy, :index, :show, :update]
  end

  root :to => 'static_pages#root'

  get '*unmatched_route', to: 'static_pages#root'

end
