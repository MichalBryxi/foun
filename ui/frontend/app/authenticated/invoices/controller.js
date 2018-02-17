import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class InvoicesController extends Controller {
  @service intl;

  get columns() {
    return [
      {
        name: this.intl.t('model.invoice.issuedAt'),
        valuePath: 'issuedAt',
        valueFormatter: (value) => (value ? this.intl.formatDate(value) : '--'),
        cellComponent: 'data-grid/cell/link-to',
        route: 'authenticated.invoice',
        model: 'id',
      },
    ];
  }

  get rows() {
    return this.model;
  }
}
