class RouteConstraint
  def matches?(request)
    !request.path.include?("assets")
  end
end

Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :show, :create, :update]
    resource :session, only: [:create, :destroy, :show]
    resources :track_search, only: :index
    resources :searches, only: :index
    resources :playlists, only: [:create, :destroy, :index, :show, :update]
    resources :playlist_tracks, only: [:create, :destroy]
    resources :tracks, only: [:create, :destroy, :index, :show, :update]
  end

  root :to => 'static_pages#root'

  get '*unmatched_route', to: 'static_pages#root',
    constraints: RouteConstraint.new

end
