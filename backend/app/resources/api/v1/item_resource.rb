module Api
  module V1
    class ItemResource < ApplicationResource
      attributes :price, :notification_count, :descendants_owe, :pay_up, :is_paid
      
      has_one :account
      has_one :invoice
      
      filter :invoice_id
    end
  end
end 