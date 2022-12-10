import Model, { attr, hasMany } from '@ember-data/model';

export default class InvoiceModel extends Model {
  @attr('string') source;

  @hasMany() items;

  @attr('date', {
    defaultValue() {
      return new Date();
    },
  })
  issuedAt;
  get issuedAtString() {
    return this.issuedAt.toISOString().replace(/T.*$/, '');
  }
  set issuedAtString(newDate) {
    this.issuedAt = new Date(newDate);
  }
}
