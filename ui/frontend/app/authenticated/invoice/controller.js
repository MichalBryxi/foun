import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class InvoiceController extends Controller {
  @service notifications;
  @service intl;

  @action
  async togglePaid(newValue, selection) {
    for (let item of selection) {
      item.isPaid = newValue;
      await item.save();
    }
  }

  @action
  async sendEmail(selection) {
    for (let item of selection) {
      item.notificationCount = item.notificationCount + 1;
      try {
        await item.save();
        this.notifications.add(
          this.intl.t('invoice.mailSentTo', {
            email: item.get('account.email'),
          })
        );
      } catch (e) {
        this.notifications.add(
          this.intl.t('invoice.mailFailed', {
            email: item.get('account.email'),
          })
        );
      }
    }
  }

  get columns() {
    return [
      {
        name: this.intl.t('model.account.depth'),
        valuePath: 'account.depth',
        cellComponent: 'data-grid/cell/depth',
      },
      {
        name: this.intl.t('model.account.name'),
        valuePath: 'account.name',
        width: 250,
      },
      {
        name: this.intl.t('model.invoice.price'),
        valuePath: 'price',
        cellComponent: 'data-grid/cell/currency',
      },
      {
        name: this.intl.t('model.invoice.descendantsOwe'),
        valuePath: 'descendantsOwe',
        cellComponent: 'data-grid/cell/currency',
      },
      {
        name: this.intl.t('model.invoice.payUp'),
        valuePath: 'payUp',
        cellComponent: 'data-grid/cell/currency',
      },
      {
        name: this.intl.t('model.invoice.notificationCount'),
        valuePath: 'notificationCount',
      },
      {
        name: this.intl.t('model.invoice.isPaid'),
        valuePath: 'isPaid',
        cellComponent: 'data-grid/cell/paid',
      },
    ];
  }

  get footerRows() {
    return [
      {
        price: this.model.items.reduce((prev, curr) => prev + curr.price, 0),
      },
    ];
  }

  get rows() {
    return this.model.items;
  }
}
