import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { inject as service } from '@ember/service';

export default class AccountRoute extends Route {
  @service store;

  model(params) {
    let query = {
      include: 'parent',
    };
    return hash({
      account: this.store.findRecord('account', params.id, query),
      accounts: this.store.findAll('account'),
    });
  }
}
