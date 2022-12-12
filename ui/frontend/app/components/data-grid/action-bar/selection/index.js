import Component from '@glimmer/component';

export default class DataGridActionBarComponent extends Component {
  get areActionsDisabled() {
    return this.args.selection.length === 0;
  }

  get isSelectAllChecked() {
    return !this.areActionsDisabled;
  }
}
