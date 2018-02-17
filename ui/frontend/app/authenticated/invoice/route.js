import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { inject as service } from '@ember/service';

export default class FooRoute extends Route {
  @service store;

  model(params) {
    let invoice = this.store.findRecord('invoice', params.id);
    let items = this.store.query('item', {
      include: 'account',
      filter: {
        invoice_id: params.id,
      },
    });

    return hash({
      invoice,
      items,
    });
  }
}
