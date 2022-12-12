class AdjustSequenceForAccounts < ActiveRecord::Migration[7.0]
  def change
    execute <<-SQL
      ALTER SEQUENCE accounts_id_seq RESTART WITH 87;
    SQL
  end
end
