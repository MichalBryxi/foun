import {
  validatePresence,
  validateDate,
} from 'ember-changeset-validations/validators';

export default {
  source: [validatePresence(true)],
  issuedAt: [validatePresence(true), validateDate()],
};
