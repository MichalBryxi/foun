import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class FooController extends Controller {
  @service notifications;
  @service intl;

  // TODO
  @action
  createAccount() {
    let account = this.store.createRecord('account');
    account
      .save()
      .then(() => {
        let message = this.intl.t('accounts.newAccountCreated');
        this.notifications.add(message);
        this.transitionToRoute('account', account.get('id'));
      })
      .catch((err) => {
        let message = this.intl.t('accounts.newAccountFailed');
        this.notifications.add(`${message}: ${err.message}`);
      });
  }

  // TODO
  @action
  delete() {
    let account = this.accountToDelete;
    account.deleteRecord();
    account
      .save()
      .then(() => {
        let message = this.intl.t('accounts.successDelete');
        this.notifications.add(message);
      })
      .catch((err) => {
        let message = this.intl.t('accounts.cannotDelete');
        this.notifications.add(`${message}: ${err.message}`);
      });

    return true;
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
