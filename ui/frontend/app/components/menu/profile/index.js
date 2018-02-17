import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class MenuProfileComponent extends Component {
  @service session;
  @tracked isMenuExpanded = false;

  @action logout() {
    this.session.invalidate();
  }
}
