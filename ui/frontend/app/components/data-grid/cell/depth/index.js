import Component from '@glimmer/component';

export default class DataGridCellDepthComponent extends Component {
  get indentation() {
    if (!this.args.row.cellValue) return [];
    return [...Array(this.args.row.cellValue).keys()];
  }
}
