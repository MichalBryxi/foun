import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class AccountsController extends Controller {
  @service notifications;
  @service intl;
  @service store;
  @service router;

  @action
  async createAccount() {
    let account = this.store.createRecord('account');
    await account.save();
    this.router.transitionTo('authenticated.account', account.id);
  }

  @action
  async deleteAccount(accounts) {
    for (const account of accounts) {
      await account.destroyRecord();
    }

    this.notifications.add(this.intl.t('deleted'));
  }

  get columns() {
    return [
      {
        name: this.intl.t('model.account.depth'),
        valuePath: 'depth',
        cellComponent: 'data-grid/cell/depth',
        width: 150,
      },
      {
        name: this.intl.t('model.account.name'),
        valuePath: 'name',
        cellComponent: 'data-grid/cell/link-to',
        route: 'authenticated.account',
        model: 'id',
        width: 250,
      },
      {
        name: this.intl.t('model.account.email'),
        valuePath: 'email',
        width: 250,
      },
      {
        name: this.intl.t('model.account.phoneNumber'),
        valuePath: 'phoneNumber',
        width: 200,
      },
      {
        name: this.intl.t('model.account.accountNumber'),
        valuePath: 'accountNumber',
        width: 200,
      },
    ];
  }

  get rows() {
    return this.model;
  }
}
