import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class DataGridComponent extends Component {
  @tracked selection = [];

  @action selectAll() {
    if (!this.selection.length) {
      this.selection = this.args.rows;
    } else {
      this.selection = [];
    }
  }
}
