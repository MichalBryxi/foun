# We could make the authentication mechanism above a bit more safe
# by requiring a token **AND** an e-mail for token authentication.
# The code in the model looks the same, we just need to slightly
# change the controller:
class Api::BaseController < ApplicationController
  include JSONAPI::ActsAsResourceController
  
  # This is our new function that comes before Devise's one
  # before_action :authenticate_user_from_token!
  # This is Devise's authentication
  # before_action :authenticate_user!

  # private
  #   # http://jsonapi-resources.com/v0.8/guide/resources.html
  #   # We need to inject current_user to context of the resource. To update .company_id in some cases
  #   def context
  #     {current_user: current_user}
  #   end
  # 
  #   def user_not_authorized
  #     head :forbidden
  #   end
  # 
  #   def authenticate_user_from_token!
  #     auth_header = (request.headers[:Authorization] || "")[6..-1]
  #     auth_hash = auth_header.split(",").map{ |e| 
  #       e.strip.tr("\"", "").split("=")
  #     }.to_h
  # 
  #     user_email = auth_hash["email"]
  #     user       = user_email && User.find_by_email(user_email)
  # 
  #     # Notice how we use Devise.secure_compare to compare the token
  #     # in the database with the token given in the params, mitigating
  #     # timing attacks.
  #     if user && Devise.secure_compare(user.authentication_token, auth_hash["token"])
  #       sign_in user, store: false
  #     end
  #   end
end