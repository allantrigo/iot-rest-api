import Joi = require('joi');

export class OwnershipValidator {
  create() {
    const schema = Joi.object({
      userId: Joi.string().required(),
      deviceId: Joi.string().required(),
      ownership: Joi.string().required(),
    });
    return schema;
  }

  edit() {
    const schema = Joi.object({
      ownership: Joi.string().required(),
    });
    return schema;
  }
}
