class Invoice < ApplicationRecord
  has_many :items, dependent: :destroy
end
