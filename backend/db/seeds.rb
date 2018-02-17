User.create([
  {
    name: 'Michal Bryxí',
    email: 'michal.bryxi@gmail.com',
    password: 'michal.bryxi@gmail.com'
  }
])

top_account = Account.create(
  {
    phone_number: '420723501243',
    name: 'Jane Doe',
    email: '', 
  }
)

Account.create([
  {
    phone_number: '420720160425',
    name: 'Michal Bryxí',
    email: 'michal.bryxi@gmail.com',
    parent: top_account
  },
  {
    phone_number: '420774256575',
    name: 'John Doe',
    email: '',
    parent: top_account
  },
])