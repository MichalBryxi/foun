import Model, { attr, belongsTo } from '@ember-data/model';

export default class ItemModel extends Model {
  @attr('number', { defaultValue: 0 }) notificationCount;
  @attr('number') price;
  @attr('number', { defaultValue: 0 }) descendantsOwe;
  @attr('number') payUp;
  @attr('boolean') isPaid;

  @belongsTo() invoice;
  @belongsTo() account;
}
