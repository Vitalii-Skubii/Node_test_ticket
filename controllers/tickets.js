const Tickets = require('../model/tickets');

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const tickets = await Tickets.getAll(userId);
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: { tickets },
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const ticket = await Tickets.getById(userId, req.params.id);
    console.log(ticket); // toObject
    if (ticket) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { ticket } }); // toJSON
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not found ticket by id' });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const ticket = await Tickets.create({ ...req.body, userId: userId });
    return res
      .status(201)
      .json({ status: 'success', code: 201, data: { ticket } });
  } catch (error) {
    if (error.name === 'ValidationError') {
      error.status = 400;
    }
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const ticket = await Tickets.remove(userId, req.params.id);
    if (ticket) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { ticket } });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not Found' });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const ticket = await Tickets.update(userId, req.params.id, req.body);
    if (ticket) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { ticket } });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not Found' });
  } catch (error) {
    next(error);
  }
};

// async (req, res, next) => {
//   try {
//     const cat = await Cats.update(req.params.id, req.body)
//     if (cat) {
//       return res
//         .status(200)
//         .json({ status: 'success', code: 200, data: { cat } })
//     }
//     return res
//       .status(404)
//       .json({ status: 'error', code: 404, message: 'Not Found' })
//   } catch (error) {
//     next(error)
//   }
// }

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
