import ApplicationSerializer from './application';

export default class ItemJSONAPISerializer extends ApplicationSerializer {
  // TODO: check this
  attrs = {
    payUp: { serialize: false },
  };
}
