class AddDepthToAccountsV2 < ActiveRecord::Migration[7.0]
  def change
    Account.update_all(depth: 0)
    Account.update_all(children_count: 0)
    
    change_column :accounts, :depth, :integer, null: false, default: 0
    change_column :accounts, :children_count, :integer, null: false, default: 0
    
    Account.reset_column_information
    Account.rebuild!
  end
end
