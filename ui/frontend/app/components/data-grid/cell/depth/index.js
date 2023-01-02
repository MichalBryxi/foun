import Component from '@glimmer/component';

const COLORS = {
  0: 'text-teal-500',
  1: 'text-sky-500',
  2: 'text-fuchsia-500',
  3: 'text-amber-500',
};

export default class DataGridCellDepthComponent extends Component {
  get depth() {
    return this.args.row.cellValue ?? 0;
  }

  get indentation() {
    return [...Array(this.depth).keys()];
  }

  get color() {
    return COLORS[this.depth];
  }
}
