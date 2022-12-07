class Item < ApplicationRecord
  after_commit :check_price_updated 
  
  belongs_to :account
  belongs_to :invoice
  
  def pay_up
    descendants_owe + price
  end
  
  before_save { |item|
    if (item.notification_count_was != item.notification_count) and (item.account.email)
      ItemMailer.invoice_email(item).deliver_now
    end
  } 
  
  def check_price_updated
    if self.saved_change_to_attribute? :price
      self.recalculate_descendants_owe
    end
  end
  
  def recalculate_descendants_owe
    # This one might be tricky, better wrap in transaction
    invoice = self.invoice
    invoice.with_lock do
      ancestor_accounts = self.account.self_and_ancestors
      ancestor_items = Item.where(invoice: invoice, account: ancestor_accounts)
      ancestor_items.each do |item|
        descendant_accounts = item.account.descendants
        sum = Item.where(invoice: invoice, account: descendant_accounts).sum(:price)
        item.descendants_owe = sum
        item.save!
      end
    end
  end
end
