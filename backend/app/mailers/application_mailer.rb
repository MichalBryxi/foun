class ApplicationMailer < ActionMailer::Base
  default from: 'Foun <postmaster@mailgun.pudr.com>'
  layout 'mailer'
end
