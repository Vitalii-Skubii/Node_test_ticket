const mongoose = require('mongoose');
const { Schema, SchemaTypes } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');
const ticketSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    priority: {
      type: Number,
      min: 0,
      max: 2,
    },
    userId: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.fullName;
        return ret;
      },
    },
  }
);

ticketSchema.path('name').validate((value) => {
  const re = /[A-Z]\w+/;
  return re.test(String(value));
});

ticketSchema.plugin(mongoosePaginate);

const Ticket = mongoose.model('ticket', ticketSchema);

module.exports = Ticket;
