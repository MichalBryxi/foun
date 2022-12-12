class AddDepthToAccountsV3 < ActiveRecord::Migration[7.0]
  def change
    Account.all.each do |account|
      account.save!
    end

    Account.rebuild!
  end
end
