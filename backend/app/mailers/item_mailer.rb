class ItemMailer < ApplicationMailer
  def invoice_email(item)
    @item = item
    @email = @item.account.email
    @subject = "foun za #{l @item.invoice.issued_at.to_date, format: :long}"
    @variable_number = @item.account.phone_number
    @parent = @item.account.parent
    @account_number = "Nevyplněno"
    @parent_name = "Nevyplněno"
    if @parent
      @account_number = @parent.account_number
      @parent_name = @item.account.parent.name
    end

    if @account_number
      parts = @account_number.split(/-|\//)
      qp = {}

      if parts.length == 3
        qp['accountPrefix'] = parts[0]
        qp['accountNumber'] = parts[1]
        qp['bankCode'] = parts[2]
      else
        qp['accountNumber'] = parts[0]
        qp['bankCode'] = parts[1]
      end

      qp['amount'] = @item.price
      qp['currency'] = 'CZK'
      qp['vs'] = @variable_number
      qp['message'] = @subject

      @qr_code = "http://api.paylibo.com/paylibo/generator/czech/image?#{qp.to_query}"
    end
    
    mail(to: @email, subject: @subject)
  end
end
