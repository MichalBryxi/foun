Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: '/users/'
  namespace :api do
    namespace :v1 do
      jsonapi_resources :invoices
      jsonapi_resources :items
      jsonapi_resources :accounts
    end 
  end
end
