import {
  validateLength,
  // validateConfirmation,
  validateFormat,
} from 'ember-changeset-validations/validators';

export default {
  identification: validateFormat({ type: 'email' }),
  password: [validateLength({ min: 12 })],
  // passwordConfirmation: validateConfirmation({ on: 'password' }),
};
