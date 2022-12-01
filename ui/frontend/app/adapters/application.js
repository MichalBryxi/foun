import JSONAPIAdapter from '@ember-data/adapter/json-api';
import config from '../config/environment';

export default class ApplicationJSONAPIAdapter extends JSONAPIAdapter {
  host = config.APP.API_HOST;
  namespace = 'api/v1';
}
