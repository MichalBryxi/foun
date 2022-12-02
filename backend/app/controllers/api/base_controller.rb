class Api::BaseController < ApplicationController
  include JSONAPI::ActsAsResourceController

  include DeviseTokenAuth::Concerns::SetUserByToken
  
  before_action :authenticate_user!
end