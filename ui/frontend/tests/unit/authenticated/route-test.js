import { module, test } from 'qunit';
import { setupTest } from 'foun/tests/helpers';

module('Unit | Route | authenticated', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:authenticated');
    assert.ok(route);
  });
});
