import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import UserValidations from '../validations/user';

export default class LoginController extends Controller {
  UserValidations = UserValidations;

  @service notifications;
  @service session;
  @service router;

  model = {
    email: '',
    password: '',
  };

  @action
  async authenticate({ email, password }) {
    try {
      await this.session.authenticate('authenticator:token', email, password);
    } catch (error) {
      this.notifications.add(error.status);
    }
  }
}
