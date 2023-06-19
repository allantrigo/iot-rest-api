import Joi = require('joi');

export class DeviceValidator {
  register() {
    const schema = Joi.object({
      name: Joi.string().required(),
      local: Joi.string().required(),
      type: Joi.string().required(),
    });
    return schema;
  }

  edit() {
    const schema = Joi.object({
      name: Joi.string(),
      local: Joi.string(),
      type: Joi.string(),
    });
    return schema;
  }
}
