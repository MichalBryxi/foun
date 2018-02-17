module Api
  module V1
    class InvoiceResource < ApplicationResource
      def self.default_sort
        [{field: 'issued_at', direction: :desc}]
      end

      attributes :source, :issued_at
      
      has_many :items
    end
  end 
end