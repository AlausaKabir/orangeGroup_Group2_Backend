import { UserModel } from '../models/';

/**
 * @fileOverview UserRepo class for user-related database operations.
 */
export default class UserRepo {
  /**
   * @description Create a new user in the database.
   * @param {Object} data - User data to be created.
   * @returns {Promise<Object>} A promise that resolves with the created user object.
   */
  static async createUser(data) {
    return UserModel.create(data);
  }

  /**
   * @description Find a user by their email address.
   * @param {string} email - The email address to search for.
   * @returns {Promise<Object|null>} A promise that resolves with the user object if found, or null if not found.
   */
  static async findUserByEmail(email) {
    return UserModel.findOne({ email });
  }

  /**
   * @description Find a user by their phone number.
   * @param {string} phone - The phone number to search for.
   * @returns {Promise<Object|null>} A promise that resolves with the user object if found, or null if not found.
   */
  static async findUserByPhone(phone) {
    return UserModel.findOne({ phone });
  }

  /**
   * @description Find a user by either email or phone number.
   * @param {string} email - The email address to search for (optional).
   * @param {string} phone - The phone number to search for (optional).
   * @returns {Promise<Object|null>} A promise that resolves with the user object if found, or null if not found.
   */
  static async findUserByEmailOrPhone(email, phone) {
    return UserModel.findOne({
      $and: [
        {
          $or: [
            { email: { $ne: null, $eq: email } },
            { phone: { $ne: null, $eq: phone } },
          ],
        },
      ],
    });
  }

  /**
   * @description Update a user's data in the database.
   * @param {string} userId - The ID of the user to update.
   * @param {Object} updatedData - The updated user data.
   * @returns {Promise<Object|null>} A promise that resolves with the updated user object if found, or null if not found.
   */
  static updateUser(userId, updatedData) {
    try {
      return UserModel.findByIdAndUpdate({ _id: userId }, updatedData, {
        new: true,
      });
    } catch (error) {
      logger.error(`UserRepo updateUser database -> error: ${error.message}`);
      throw error;
    }
  }

  /**
   * @description Delete a user from the database by their ID.
   * @param {string} userId - The ID of the user to delete.
   * @returns {Promise<Object|null>} A promise that resolves with the deleted user object if found, or null if not found.
   */
  static deleteUser(userId) {
    try {
      return UserModel.findByIdAndDelete(userId);
    } catch (error) {
      logger.error(`UserRepo deleteUser database -> error: ${error.message}`);
      throw error;
    }
  }

  /**
   * @description Retrieve a list of all users in the database.
   * @returns {Promise<Array>} A promise that resolves with an array of all user objects.
   */
  static async getAllUsers() {
    try {
      const users = await UserModel.find();
      return users;
    } catch (error) {
      logger.error(`UserRepo getAllUsers database -> error: ${error.message}`);
      throw error;
    }
  }

  /**
   * @description Find a user by their unique ID and optionally populate related models.
   * @param {string} userId - The ID of the user to find.
   * @param {boolean} lean - Whether to return a plain JavaScript object instead of a Mongoose document.
   * @param {string[]} populate - An array of populate options for mongoose.
   * @returns {Promise<Object|null>} A promise that resolves with the user object if found, or null if not found.
   */
  static async findUserById(userId, lean = false, populate = []) {
    try {
      let query = UserModel.findById(userId);

      populate.forEach((pop) => {
        query = query.populate(pop);
      });

      if (lean) {
        query = query.lean();
      }

      const user = await query;

      if (user && lean) {
        user.id = user._id;
      }

      return user;
    } catch (error) {
      logger.error(`UserRepo findUserById database -> error: ${error.message}`);
      throw error;
    }
  }

  static async updateAndPush(userId, data) {
    return UserModel.findOneAndUpdate(
      { _id: userId },
      { $push: data },
      { new: true }
    );
  }
}
