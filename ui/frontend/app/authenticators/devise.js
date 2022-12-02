import Devise from 'ember-simple-auth/authenticators/devise';
import { Promise } from 'rsvp';
import { run } from '@ember/runloop';
import config from '../config/environment';

export default class DeviseAuthenticator extends Devise {
  serverTokenEndpoint = `${config.APP.API_HOST}/users/sign_in`;

  // This defaults to 'token' and I have no clue why this is needed.
  // But [this line](https://github.com/mainmatter/ember-simple-auth/blob/master/packages/ember-simple-auth/addon/authenticators/devise.js#L172) requests it.
  tokenAttributeName = 'uid';

  // Seems like devise-token-auth returns this format
  resourceName = 'data';

  authenticate(identification, password) {
    return new Promise((resolve, reject) => {
      const { identificationAttributeName, tokenAttributeName } = this;
      const data = {};
      // TODO: Raise a ticket to _not_ require [resourceName](https://github.com/mainmatter/ember-simple-auth/blob/master/packages/ember-simple-auth/addon/authenticators/devise.js#L107)
      data['password'] = password;
      data[identificationAttributeName] = identification;

      this.makeRequest(data)
        .then((response) => {
          if (response.ok) {
            response.json().then((json) => {
              if (this._validate(json)) {
                const resourceName = this.resourceName;
                const _json = json[resourceName] ? json[resourceName] : json;
                run(null, resolve, _json);
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
