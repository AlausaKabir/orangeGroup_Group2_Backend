const AppError = require('../../../utils/appError');
const catchAsync = require('../../../utils/catchAsync');
const { default: MessageService } = require('../services/messageService');

exports.createMessage = catchAsync(async (req, res, next) => {
  const result = await MessageService.createMessage(req.body);

  if (result.statusCode !== 201) return next(new AppError(result.message, 400));

  logger.info(`createMessage => info: Message created successfully`);

  res.status(result.statusCode).json({
    status: 'success',
    ...result,
  });
});

exports.getMessages = catchAsync(async (req, res, next) => {
  const result = await MessageService.getMessages();

  logger.info(`getMessages => info: Messages fetched successfully`);

  res.status(result.statusCode).json({
    status: 'sucess',
    ...result,
  });
});

exports.getMessagesSentByOneUser = catchAsync(async (req, res, next) => {
  const { _id: userId } = req.user;

  const result = await MessageService.getMessagesSentByAUser(userId);

  if (result.statusCode !== 200) return next(new AppError(result.message, 400));

  res.status(result.statusCode).json({
    status: 'success',
    ...result,
  });
});

exports.updateMessageToReadForAUser = catchAsync(async (req, res, next) => {
  const { _id: userId } = req.user;
  const { messageId } = req.params;

  const result = await MessageService.updateMessageToReadForAUser(
    messageId,
    userId
  );

  if (result.statusCode !== 200) return next(new AppError(result.message, 400));

  res.status(result.statusCode).json({
    status: 'success',
    ...result,
  });
});

/**
 *
 */

exports.deleteMesage = catchAsync(async (req, res, next) => {
  const { _id: userId } = req.user;
  const { messageId } = req.params;

  // if (userId !== me )

  const result = await MessageService.deleteMessage(messageId);
  logger.info(`deleteMessage => info: Message deleted successfully`);

  if (result.statusCode !== 204) return next(new AppError(result.message, 400));

  res.status(result.statusCode).json({
    status: 'sucesss',
    ...result,
  });
});
