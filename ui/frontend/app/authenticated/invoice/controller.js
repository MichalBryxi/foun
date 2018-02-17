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
        name: this.intl.t('model.account.name'),
        valuePath: 'account.name',
      },
      {
        name: this.intl.t('model.invoice.price'),
        valuePath: 'price',
      },
      {
        name: this.intl.t('model.invoice.descendantsOwe'),
        valuePath: 'descendantsOwe',
      },
      {
        name: this.intl.t('model.invoice.payUp'),
        valuePath: 'payUp',
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

  get rows() {
    return this.model.items;
  }
}
