class AddDepthToAccounts < ActiveRecord::Migration[7.0]
  def change
    add_column :accounts, :depth,          :integer
    add_column :accounts, :children_count,  :integer

    Account.reset_column_information
    Account.rebuild!
  end
end
