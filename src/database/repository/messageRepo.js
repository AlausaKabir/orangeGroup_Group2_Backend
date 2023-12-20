import Message from '../models/Message';

/**
 * @fileoverview MessageRepo class for database calls for message related operations
 */

export default class MessageRepo {
  /**
   * @description Create a message in the database
   * @param {Object} data - message to be createdd.
   * @returns {Promise<Object>} A promise that resolves with the message created
   */

  static async createMessage(data) {
    return await Message.create(data);
  }

  /**
   * @description Get a message by it's id.
   * @param {ObjectId} id - The id of the messasge to search for.
   * @returns {Promise<Object>|null} - A promise that resolves with the message object if found or null if not.
   */

  static async getMessageById(id) {
    return await Message.findById(id);
  }

  /**
   * @description Get messages sent to a user(recipient).
   * @param {ObjectId} userId - The id of the user to get messages for.
   * @returns {Promise<Array>} - A promise that resolves with the array of messages for the user(reciepient)
   */

  static async getAllMessagesForAUser(userId) {
    return await Message.find({ sender: userId });
  }

  /**
   * @description Get all messages in the database
   * @returns {Promise<Array>} - A promise that resolves with an array of messages in the database
   */

  static async getMessages() {
    return await Message.find();
  }

  /**
   *
   * @param {*} messageId
   * @returns
   */

  static async getOneMessage(messageId) {
    return await Message.findById(messageId);
  }

  /**
   *
   * @param {*} messageId
   * @param {*} content
   * @returns
   */

  static async editMessage(messageId, content) {
    return await Message.findOneAndUpdate(
      { _id: messageId },
      { content },
      {
        new: true,
        runValidators: true,
      }
    );
  }

  /**
   *
   * @param {*} messageId
   * @param {*} userId
   * @returns
   */

  static async updateIsRead(messageId, userId) {
    return await Message.findOneAndUpdate(
      { _id: messageId, 'recipients.user': userId },
      { 'recipients.$.isRead': true },
      {
        new: true,
        runValidators: true,
      }
    );
  }

  /**
   *
   * @param {*} messageId
   * @returns
   */

  static async deleteMessage(messageId) {
    return await Message.findOneAndDelete(messageId);
  }

  static async unreadMessageCount(userId) {
    return await Message.countDocuments({
      recipients: {
        $elemMatch: { user: userId, isRead: false },
      },
    });
  }
}
