import JSONAPIAdapter from '@ember-data/adapter/json-api';
import config from '../config/environment';

export default class ApplicationJSONAPIAdapter extends JSONAPIAdapter {
  host = config.APP.SERVER;
  namespace = 'api/v1';
}
