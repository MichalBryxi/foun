import ApplicationSerializer from './application';

export default class AccountJSONAPISerializer extends ApplicationSerializer {
  // TODO: this looks sus
  attrs = {
    lft: { serialize: false },
    rgt: { serialize: false },
    // parent_id { serialize: false }
  };
}
