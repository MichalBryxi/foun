import EmberRouter from '@ember/routing/router';
import config from 'foun/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login');

  this.route('authenticated', { path: '' }, function () {
    this.route('invoices');
    this.route('invoice', { path: 'invoice/:id' });
    this.route('import', function () {
      this.route('new');
      this.route('edit', { path: 'edit/:id' });
      this.route('send', { path: 'send/:id' });
    });
    this.route('accounts');
    this.route('account', { path: 'account/:id' });
  });
});
