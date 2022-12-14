import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class AccountModel extends Model {
  @attr('string', { defaultValue: '420xxxxxxxxx' }) phoneNumber;
  @attr('string', { defaultValue: '' }) accountNumber;
  @attr('string', { defaultValue: 'John Doe' }) name;
  @attr('string', { defaultValue: 'john.doe@example.com' }) email;

  @attr('number', { readOnly: true }) lft;
  @attr('number', { readOnly: true }) rgt;
  @attr('number', { readOnly: true }) depth;
  @attr('number', { readOnly: true }) childrenCount;

  @belongsTo('account', { inverse: 'children' }) parent;
  @hasMany('account', { inverse: 'parent' }) children;
}
