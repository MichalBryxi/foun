import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class FooController extends Controller {
  @service notifications;
  @service intl;

  @action
  saveAccount(account) {
    account
      .save()
      .then(() => {
        let message = this.intl.t('account.saved');
        this.notifications.add(message);
      })
      .catch((err) => {
        let message = this.intl.t('account.saveError');
        this.notifications.add(`${message}: ${err.message}`);
      });
  }
}
