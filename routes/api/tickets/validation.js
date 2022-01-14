const Joi = require('joi');

const schemaCreateTicket = Joi.object({
  name: Joi.string()
    .alphanum()
    .regex(/[A-Z]\w+/)
    .min(3)
    .max(30)
    .required(),
  priority: Joi.number().integer().min(0).max(2).required(),
  // isVaccinated: Joi.boolean().optional(),
});

const schemaUpdateTicket = Joi.object({
  name: Joi.string()
    .alphanum()
    .regex(/[A-Z]\w+/)
    .min(3)
    .max(30)
    .optional(),
  priority: Joi.number().integer().min(0).max(2).required(),
  // isVaccinated: Joi.boolean().optional(),
});

// const schemaStatusVaccinatedCat = Joi.object({
//   isVaccinated: Joi.boolean().required(),
// });

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body);
    next();
  } catch (err) {
    next({ status: 400, message: `Field: ${err.message.replace(/"/g, '')}` });
  }
};

module.exports.validateCreateTicket = (req, _res, next) => {
  return validate(schemaCreateTicket, req.body, next);
};

module.exports.validateUpdateTicket = (req, _res, next) => {
  return validate(schemaUpdateTicket, req.body, next);
};
// module.exports.validateStatusVaccinatedCat = (req, _res, next) => {
//   return validate(schemaStatusVaccinatedCat, req.body, next);
// };
