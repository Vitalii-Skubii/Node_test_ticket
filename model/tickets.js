const Ticket = require('./schemas/ticket');

const getAll = async (userId) => {
  const results = await Ticket.find({ userId: userId }).populate({
    path: 'userId',
    select: 'name ',
  });

  return results;
};

const getById = async (userId, id) => {
  const result = await Ticket.findOne({ _id: id, userId: userId }).populate({
    path: 'userId',
    select: 'name ',
  });
  return result;
};

const remove = async (userId, id) => {
  const result = await Ticket.findByIdAndRemove({ _id: id, userId: userId });
  return result;
};

const create = async (body) => {
  const result = await Ticket.create(body);
  return result;
};

const update = async (userId, id, body) => {
  const result = await Ticket.findOneAndUpdate(
    {
      _id: id,
      userId: userId,
    },
    { ...body },
    { new: true }
  );
  return result;
};

module.exports = {
  getAll,
  getById,
  remove,
  create,
  update,
};
