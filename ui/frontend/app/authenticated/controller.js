import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class AuthenticatedController extends Controller {
  @service intl;

  @tracked isMobileMenuExpanded = false;

  menuItems = [
    {
      route: 'authenticated.accounts',
      label: this.intl.t('menu.accounts'),
    },
    {
      route: 'authenticated.invoices',
      label: this.intl.t('menu.invoices'),
    },
  ];
}
