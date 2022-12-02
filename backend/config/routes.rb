Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  as :user do
    # Define routes for User within this block.
  end
  
  namespace :api do
    namespace :v1 do
      jsonapi_resources :invoices
      jsonapi_resources :items
      jsonapi_resources :accounts
    end 
  end
end
