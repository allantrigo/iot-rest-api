import Joi = require('joi');

export class UserValidator {
  register() {
    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string()
        .required()
        .min(8)
        .max(32)
        .regex(
          new RegExp(
            '^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){0,})(?=(.*[!@# $%^&*()-__+.]){1,}).{8,32}$',
          ),
        ),
      confirmPassword: Joi.ref('password'),
    }).with('password', 'confirmPassword');
    return schema;
  }

  edit() {
    const schema = Joi.object({
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string().email(),
    });
    return schema;
  }

  findByEmail() {
    const schema = Joi.object({
      email: Joi.string().email().required(),
    });
    return schema;
  }

  public changePassword() {
    const schema = Joi.object({
      email: Joi.string().email(),
      actualPassword: Joi.string()
        .min(8)
        .max(32)
        .required()
        .regex(
          new RegExp(
            '^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){0,})(?=(.*[!@# $%^&*()-__+.]){1,}).{8,32}$',
          ),
        ),
      password: Joi.string()
        .required()
        .min(8)
        .max(32)
        .regex(
          new RegExp(
            '^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){0,})(?=(.*[!@# $%^&*()-__+.]){1,}).{8,32}$',
          ),
        ),
      confirmPassword: Joi.ref('password'),
    }).with('password', 'confirmPassword');
    return schema;
  }

  public delete() {
    const schema = Joi.object({
      password: Joi.string()
        .required()
        .min(8)
        .max(32)
        .regex(
          new RegExp(
            '^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){0,})(?=(.*[!@# $%^&*()-__+.]){1,}).{8,32}$',
          ),
        ),
      confirmPassword: Joi.ref('password'),
    }).with('password', 'confirmPassword');
    return schema;
  }
}
