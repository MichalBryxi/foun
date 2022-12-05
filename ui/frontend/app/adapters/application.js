import JSONAPIAdapter from '@ember-data/adapter/json-api';
import config from '../config/environment';
import { inject as service } from '@ember/service';

export default class ApplicationJSONAPIAdapter extends JSONAPIAdapter {
  host = config.APP.API_HOST;
  namespace = 'api/v1';

  @service session;

  get headers() {
    if (this.session.isAuthenticated) {
      return {
        'access-token': this.session.data.authenticated['access-token'],
        client: this.session.data.authenticated['client'],
        uid: this.session.data.authenticated['uid'],
      };
    } else {
      return {};
    }
  }

  handleResponse(status) {
    if (status === 401 && this.session.isAuthenticated) {
      this.session.invalidate();
    }
    return super.handleResponse(...arguments);
  }
}
