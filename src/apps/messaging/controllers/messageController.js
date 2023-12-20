const {
  default: MessageRepo,
} = require('../../../database/repository/messageRepo');
const AppError = require('../../../utils/appError');
const catchAsync = require('../../../utils/catchAsync');
const { default: MessageService } = require('../services/messageService');

/**
 * @description Create a message.
 * @param {Object} req - HTTP Request
 * @param {Object} res - HTTP Response
 * @param {Function} next - Next Function
 * @returns {Object} - Returns an Object
 */

exports.createMessage = catchAsync(async (req, res, next) => {
  const { _id: userId } = req.user;
  const result = await MessageService.createMessage({
    sender: userId,
    ...req.body,
  });

  if (result.statusCode !== 201) return next(new AppError(result.message, 400));

  logger.info(`createMessage => info: Message created successfully`);

  res.status(result.statusCode).json({
    status: 'success',
    ...result,
  });
});

/**
 * @description Get all messages in the database.
 * @param {Object} req - HTTP Request
 * @param {Object} res - HTTP Response
 * @param {Function} next - Next Function
 * @returns {Array} - Returns an Array of Objects
 */

exports.getMessages = catchAsync(async (req, res, next) => {
  const result = await MessageService.getMessages();

  logger.info(`getMessages => info: Messages fetched successfully`);

  res.status(result.statusCode).json({
    status: 'sucess',
    ...result,
  });
});

exports.getOneMessage = catchAsync(async (req, res, next) => {
  const { messageId } = req.params;

  const result = await MessageService.getOneMessage(messageId);

  logger.info(`getOneMessage => info: Message fetched successfully`);

  res.status(result.statusCode).json({
    status: 'success',
    ...result,
  });
});

exports.editMessage = catchAsync(async (req, res, next) => {
  const { messageId } = req.params;
  const { content } = req.body;

  const result = await MessageService.editMessage(messageId, content);

  logger.info(`editMessage => info: Message edited successfully`);

  res.status(result.statusCode).json({
    status: 'success',
    ...result,
  });
});

/**
 * @description Get messages sent by a user.
 * @param {Object} req - HTTP Request
 * @param {Object} res - HTTP Response
 * @param {Function} next - Next Function
 * @returns {Array} - Returns an Array of Objects
 */

exports.getMessagesSentByOneUser = catchAsync(async (req, res, next) => {
  const { _id: userId } = req.user;

  const result = await MessageService.getMessagesSentByAUser(userId);

  if (result.statusCode !== 200) return next(new AppError(result.message, 400));

  res.status(result.statusCode).json({
    status: 'success',
    ...result,
  });
});

/**
 * @description Update a message to read for a recipient.
 * @param {Object} req - HTTP Request
 * @param {Object} res - HTTP Response
 * @param {Function} next - Next Function
 * @returns {Object} - Returns an Object
 */
exports.updateMessageToReadForAUser = catchAsync(async (req, res, next) => {
  const { _id: userId } = req.user;
  const { messageId } = req.params;

  const result = await MessageService.updateMessageToReadForAUser(
    messageId,
    userId
  );

  if (result.statusCode !== 200)
    return next(new AppError(result.message, result.statusCode));

  res.status(result.statusCode).json({
    status: 'success',
    ...result,
  });
});

/**
 * @description Delete a message.
 * @param {Object} req - HTTP Request
 * @param {Object} res - HTTP Response
 * @param {Function} next - Next Function
 * @returns {Object} - Returns a void
 */

exports.deleteMesage = catchAsync(async (req, res, next) => {
  const { _id: userId } = req.user;
  const { messageId } = req.params;

  const result = await MessageService.deleteMessage(messageId);

  console.log({ result });
  logger.info(`deleteMessage => info: Message deleted successfully`);

  if (result.statusCode !== 204) return next(new AppError(result.message, 400));

  res.status(result.statusCode).json({
    status: 'sucesss',
    ...result,
  });
});

/**
 *
 * @returns
 */

exports.restrictToSender = () => {
  return async (req, res, next) => {
    const { messageId } = req.params;

    const message = await MessageRepo.getMessageById(messageId);

    if (!message) return next(new AppError('No message found', 404));

    if (message?.sender._id.toString() !== req.user._id.toString())
      return next(
        new AppError(
          'You are not the sender hence not authorized to perform any operation on this message',
          400
        )
      );

    next();
  };
};

exports.unreadMessageCount = catchAsync(async (req, res, next) => {
  const { _id: userId } = req.user;
  const result = await MessageService.getUnreadMessageCount(userId);

  logger.info(
    `unreadMessageCount => info: Unread messages count fetched successfully`
  );

  res.status(result.statusCode).json({
    status: 'success',
    ...result,
  });
});
