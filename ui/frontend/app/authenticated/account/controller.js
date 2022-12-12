import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class AccountController extends Controller {
  @service notifications;
  @service intl;
  @service router;

  @action
  async saveAccount() {
    this.notifications.add(this.intl.t('saved'));
    this.router.transitionTo('authenticated.accounts');
  }
}
