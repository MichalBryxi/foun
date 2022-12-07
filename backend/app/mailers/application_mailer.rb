class ApplicationMailer < ActionMailer::Base
  default from: 'postmaster@mailgun.pudr.com'
  layout 'mailer'
end
