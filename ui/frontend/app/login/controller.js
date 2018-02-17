import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import UserValidations from '../validations/user';

export default class LoginController extends Controller {
  UserValidations = UserValidations;

  @tracked errorMessage;
  @service session;
  @service router;

  model = {
    identification: '',
    password: '',
  };

  @action
  async authenticate(data) {
    let { identification, password } = data;
    try {
      await this.session.authenticate(
        'authenticator:devise',
        identification,
        password
      );
    } catch (error) {
      this.errorMessage = error.error || error;
    }

    if (this.session.isAuthenticated) {
      this.router.transitionTo('authenticated.invoices');
    }
  }
}
