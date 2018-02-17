import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { inject as service } from '@ember/service';

export default class AuthenticatedImportRoute extends Route {
  @service store;

  model() {
    return hash({
      accounts: this.store.findAll('account'),
      newInvoice: this.store.createRecord('invoice'),
    });
  }
}
