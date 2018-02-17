import Controller from '@ember/controller';
import InvoiceValidations from 'foun/validations/invoice';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import PapaParse from 'papaparse';
import { inject as service } from '@ember/service';

export default class AuthenticatedImportController extends Controller {
  @service store;
  @service notifications;
  @service intl;
  @service router;

  InvoiceValidations = InvoiceValidations;

  @action
  async parseInvoice() {
    const invoice = this.model.newInvoice;
    const { accounts } = this.model;
    let okCount = 0;

    try {
      await invoice.save();
    } catch (e) {
      this.notifications.add(this.intl.t('import.new.error.invoiceSave'));
      return;
    }

    let rows = PapaParse.parse(invoice.source).data;
    rows.shift();

    for (let row of rows) {
      let phoneNumber = row[0];
      let price = row[13].replace(',', '.');

      let account = accounts.findBy('phoneNumber', phoneNumber);
      if (account) {
        let item = this.store.createRecord('item', {
          invoice,
          account,
          price,
        });

        try {
          await item.save();
          okCount++;
        } catch (e) {
          this.notifications.add(
            this.intl.t('import.new.error.itemSave', { phoneNumber })
          );
        }
      } else {
        this.intl.t('import.new.error.accountNotFound', { phoneNumber });
      }
    }

    this.notifications.add(
      this.intl.t('import.new.error.okCount', { okCount })
    );

    this.router.transitionTo('authenticated.invoice', invoice.id);
  }
}
