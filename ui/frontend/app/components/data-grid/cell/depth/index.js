import Component from '@glimmer/component';

export default class DataGridCellDepthComponent extends Component {
  get indentation() {
    return [...Array(this.args.row.rowValue.depth).keys()];
  }
}
