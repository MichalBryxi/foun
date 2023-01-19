import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class InvoicesController extends Controller {
  @service intl;
  @service notifications;

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

  @action
  async deleteInvoices(invoices) {
    for (let invoice of invoices) {
      await invoice.destroyRecord();
      this.notifications.add(this.intl.t('deleted'));
    }
  }
}
