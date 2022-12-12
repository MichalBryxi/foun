import JSONAPISerializer from '@ember-data/serializer/json-api';

export default class ApplicationSerializer extends JSONAPISerializer {
  serializeAttribute(snapshot, json, key, attribute) {
    if (!attribute.options.readOnly) {
      super.serializeAttribute(...arguments);
    }
  }
}
