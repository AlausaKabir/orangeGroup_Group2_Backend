import mongoose from 'mongoose';

const messageSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    recipients: [
      {
        user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
        isRead: {
          type: Boolean,
          default: false,
        },
      },
    ],
    content: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

messageSchema.pre(/^find/, async function (next) {
  this.populate({
    path: 'sender',
    select: 'firstName lastName email',
  });
  next();
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
