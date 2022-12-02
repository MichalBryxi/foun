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
      console.log({ error });
      this.notifications.add(error.error || error);
    }
  }
}
