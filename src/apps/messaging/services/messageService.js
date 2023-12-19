import Message from '../../../database/models/Message';
import MessageRepo from '../../../database/repository/messageRepo';
import AppError from '../../../utils/appError';

export default class MessageService {
  /**
   * @description Create a message.
   * @param {Object} data The data object that contains the details of the message
   * @returns {Promise<Object>} - A promise that resolves to the message object been created.
   */

  static async createMessage(data) {
    // const { sender, recipients, content } = data;

    try {
      if (data.recipients?.length === 0)
        return new AppError('There should be at least one recipient', 400);

      const message = await MessageRepo.createMessage(data);

      logger.info(`createMessage => info: Message created`, message);

      return {
        statusCode: 201,
        message: 'Message created and sent successfully',
        data: {
          message,
        },
      };
    } catch (error) {
      logger.error(`createMessage => error: ${error.message}`);
      throw error;
    }
  }

  /**
   * @description - Fetch all messages available in the database.
   * @returns {Promise<Array>} A promise that resolves to an array of all messages
   */

  static async getMessages() {
    try {
      const messages = await MessageRepo.getMessages();
      logger.info(`getMessages -> info: All messages fetched!`);

      return {
        statusCode: 200,
        length: messages.length,
        message: 'Messages fetched successfully',
        data: {
          messages,
        },
      };
    } catch (error) {
      logger.error(`getMessage => error: ${error.message}`);
      throw error;
    }
  }

  /**
   * @description - Find list of messages sent by a certain user.
   * @param {ObjectId} userId - The ID of the user.
   * @returns {Promise<Array>} - A promise that resolves to the array of messages sent by the user.
   */

  static async getMessagesSentByAUser(userId) {
    try {
      const messages = await MessageRepo.getAllMessagesForAUser(userId);
      logger.info(
        `getMessagesSentByAUser -> info: Messages sent by this user fetched successfully`
      );

      return {
        statusCode: 200,
        message: 'Messages fetched successfully',
        length: messages.length,
        data: {
          messages,
        },
      };
    } catch (error) {
      logger.error(`getMessagesByAUser => error: ${error.message}`);
      throw error;
    }
  }

  /**
   * @description - Update the read flag for a recipient.
   * @param {ObjectId} messageId - The ID of the message to be updated.
   * @param {ObjectId} userId - The ID of the reciepient.
   * @returns {Promise<Object|null>} A promise that resolves to the updated message object if found and null if not.
   */

  static async updateMessageToReadForAUser(messageId, userId) {
    try {
      const message = await MessageRepo.updateIsRead(messageId, userId);
      logger.info(
        `updateMessageToReadForAUser => info: Message with id: ${messageId} updated to read successfully for ${userId}`
      );

      if (!message) return new AppError('No message with that ID found!', 404);

      return {
        statusCode: 200,
        message: 'Message updated to read successfully',
        data: {
          message,
        },
      };
    } catch (error) {
      console.log('Error Here:', error.message);
      logger.error(`updateMessageToReadForAUser => error: ${error.message}`);
      throw error;
    }
  }

  /**
   * @description Deletes a message from the database.
   * @param {ObjectId} messageId - The ID of the message to be deleted
   * @returns {}
   */

  static async deleteMessage(messageId) {
    try {
      const message = await MessageRepo.deleteMessage(messageId);

      if (!message)
        return new AppError(
          'Message with the specified ID not found on this server',
          404
        );

      console.log({ message });
      logger.info(
        `deleteMessage => info: Message with id: ${messageId} deleted successfully by sender`
      );

      return {
        statusCode: 204,
        message: 'Message deleted successfully',
      };
    } catch (error) {
      console.log('Error here:', error.message);
      logger.error(`deleteMessage => error: ${error.message}`);
      return new AppError(error, 400);
    }
  }
}
