module Api
  module V1
    class AccountResource < ApplicationResource
      attributes :phone_number, :name, :email, :lft, :rgt, :account_number, :depth, :children_count
      
      has_one :parent, class_name: 'Account'
      
      def self.default_sort
        [ { field: 'lft', direction: :asc } ] 
      end
    end
  end 
end