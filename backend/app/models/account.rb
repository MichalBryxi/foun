class Account < ApplicationRecord
  acts_as_nested_set :counter_cache => :children_count
end
