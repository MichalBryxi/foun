import Devise from 'ember-simple-auth/authenticators/devise';
import { Promise } from 'rsvp';
import { run } from '@ember/runloop';
import config from '../config/environment';

export default class TokenAuthenticator extends Devise {
  serverTokenEndpoint = `${config.APP.API_HOST}/auth/sign_in`;

  tokenAttributeName = 'access-token';

  authenticate(email, password) {
    return new Promise((resolve, reject) => {
      const data = {
        email,
        password,
      };

      this.makeRequest(data)
        .then((response) => {
          if (response.ok) {
            let json = {};
            json['client'] = response.headers.get('client');
            json['email'] = response.headers.get('uid');
            json['uid'] = response.headers.get('uid');
            json['access-token'] = response.headers.get('access-token');

            if (this._validate(json)) {
              run(null, resolve, json);
            } else {
              run(null, reject, `Something went wrong :(`);
            }
          } else {
            run(null, reject, response);
          }
        })
        .catch((error) => run(null, reject, error));
    });
  }
}
