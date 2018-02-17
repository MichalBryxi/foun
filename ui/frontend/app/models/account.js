import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class AccountModel extends Model {
  @attr('string', { defaultValue: '420xxxxxxxxx' }) phoneNumber;
  @attr('string', { defaultValue: '' }) accountNumber;
  @attr('string', { defaultValue: 'John Doe' }) name;
  @attr('string', { defaultValue: 'john.doe@example.com' }) email;
  @attr('string') facebookUserId;

  @attr('number', { defaultValue: 0 }) lft;
  @attr('number', { defaultValue: 0 }) rgt;

  @belongsTo('account', { inverse: 'children' }) parent;
  @hasMany('account', { inverse: 'parent' }) children;
}
