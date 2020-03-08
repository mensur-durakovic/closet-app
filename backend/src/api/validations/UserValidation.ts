import { Joi } from 'celebrate';
import Gender from '../../constants/gender';
import Roles from '../../constants/roles';

export const EditUserValidation = {
  body: Joi.object({
    id: Joi.number().required(),
    data: Joi.object().keys({
      dateOfBirth: Joi.date(),
      favouriteQuote: Joi.string(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      password: Joi.string(),
    }),
  }),
};
