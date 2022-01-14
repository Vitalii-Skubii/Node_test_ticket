const express = require('express');
const router = express.Router();
const ctrl = require('../../../controllers/tickets');
const guard = require('../../../helpers/guard');

const {
  validateCreateTicket,

  validateUpdateTicket,
} = require('./validation');

router.get('/', guard, ctrl.getAll);

router.get('/:id', guard, ctrl.getById);

router.post('/', guard, validateCreateTicket, ctrl.create);

router.delete('/:id', guard, ctrl.remove);

router.put('/:id', guard, validateUpdateTicket, ctrl.update);

// router.patch('/:id/vaccinated', guard, ctrl.update);

module.exports = router;
