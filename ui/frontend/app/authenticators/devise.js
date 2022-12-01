import Devise from 'ember-simple-auth/authenticators/devise';
import { Promise } from 'rsvp';
import { run } from '@ember/runloop';
import config from '../config/environment';

export default class DeviseAuthenticator extends Devise {
  serverTokenEndpoint = `${config.APP.API_HOST}/users/sign_in`;

  authenticate(identification, password) {
    return new Promise((resolve, reject) => {
      const { identificationAttributeName, tokenAttributeName } = this;
      const data = {};
      data['password'] = password;
      data[identificationAttributeName] = identification;

      this.makeRequest(data)
        .then((response) => {
          if (response.ok) {
            response.json().then((responseJSON) => {
              let json = {};

              json['role'] = responseJSON.data.role;
              json[identificationAttributeName] = response.headers.get('uid');
              json[tokenAttributeName] = response.headers.get('access-token');
              // TODO: This should go through config, but ember-simple-auth does not have respective field.
              json['client'] = response.headers.get('client');
              if (this._validate(json)) {
                run(null, resolve, json);
              } else {
                run(
                  null,
                  reject,
                  `Check that server response includes ${tokenAttributeName} and ${identificationAttributeName}`
                );
              }
            });
          } else {
            run(null, reject, response);
          }
        })
        .catch((error) => run(null, reject, error));
    });
  }
}
