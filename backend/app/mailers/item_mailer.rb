class ItemMailer < ApplicationMailer
  def invoice_email(item)
    @item = item
    @email = @item.account.email
    @subject = "foun za #{@item.invoice.issued_at}"
    @variable_number = @item.account.phone_number
    @parent = @item.account.parent
    @account_number = "Nevyplněno"
    @parent_name = "Nevyplněno"
    if @parent
      @account_number = @parent.account_number
      @parent_name = @item.account.parent.name
    end
    
    mail(to: @email, subject: @subject)
  end
end
