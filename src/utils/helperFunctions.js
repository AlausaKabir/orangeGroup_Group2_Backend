import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import keys from '../config/keys';
import { ObjectId } from 'mongodb';

/**
 * @description - This is a class that contains helper functions used across the application.
 */

export default class HelperFunctions {
  /**
   * @description - This method is used to hash a password
   * @param {string} password - The password to be hashed
   * @returns {string} - Returns a string
   * @memberof HelperFunctions
   */

  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  /**
   * @description - This method is used to compare a password
   * @param {string} password - The password to be compared
   * @param {string} hashedPassword - The hashed password to be compared with
   * @returns {string} - Returns a string
   * @memberof HelperFunctions
   */
  static comparePassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  }

  /**
   * @description - This method is used to capitalize the first letter of every word in a string.
   * @param {string} string - The string sent.
   * @returns {string} - Returns a formatted string with capitalized first letter of every word.
   * @memberof HelperFunctions
   */
  static capitalize(string) {
    return string.replace(/\b\w/g, (char) => char.toUpperCase());
  }


  /**
   * @description this function is used to compare the password
   * @param {*} password - password to be compared
   * @param {*} hash - hashed password
   * @returns {Object} - returns true if the password matches the hashed password else false
   */
  static async comparePassword(password, hash) {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  }

  /**
   * @description function to generate a random 6 digit number
   * @return {Number} Returned object
   * */
  static generateRandomNumber(digits = 6) {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


  static replaceValue(param, oldValue, newValue) {
    return param.replace(oldValue, newValue);
  }

  /**
   * @description check if a string is a valid opening or closing time
   * @param {String} time - The time to be checked
   * @return {Boolean} Returned object
   * */
  static isValidTime(time) {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(time);
  }

  /**
   * @description Generates a deterministic hash for a user a hash is a unique token for a user.
   * @param {string} userId - The unique user identifier.
   * @param {string} token - The random token to be used.
   * @returns {string} A hash representing the unique token for the user.
   */
  static deterministicHash(userId, token) {
    const combination = userId.toString() + token.toString();
    const hash = crypto.createHash('sha256').update(combination).digest('hex');
    return hash;
  }

  /**
   * @description Confirms a deterministic hash for a user a hash is a unique token for a user.
   * @param {string} userId - The unique user identifier.
   * @param {string} token - The random token to be used.
   * @param {string} hash - The hash to be confirmed.
   * @returns {boolean} A boolean representing the confirmation of the hash.
   */
  static async confirmDeterministicHash(userId, token, hash) {
    const combination = userId.toString() + token.toString();
    const newHash = crypto
      .createHash('sha256')
      .update(combination)
      .digest('hex');
    return newHash === hash;
  }


  /**
   * @description function to initiate verification for Authenticated user
   * @param {object} user - The user data
   * @param {number} attempt - The number of attempts
   * @returns {object} - Returns an object
   */
  static async generateUniqueToken(user, attempt = 0) {
    const userId = user._id.toString() || user.id.toString();

    if (attempt > keys.TOKEN_GENERATION_LIMIT)
      return {
        statusCode: 500,
        message: 'Error generating token',
      };

    const token = HelperFunctions.generateRandomNumber(6);

    const uniqueTokenHashToHash = `${userId}${token}`;

    const uniqueTokenHash = HelperFunctions.deterministicHash(
      userId,
      uniqueTokenHashToHash
    );

    const tokenExists = await VerificationRepo.findVerificationByHashToken(
      uniqueTokenHash
    );

    if (tokenExists) return this.generateUniqueToken(user, attempt + 1);

    logger.info(
      `generateUniqueToken -> info: Verification initiated with email: ${JSON.stringify(
        token
      )}`
    );

    return {
      statusCode: 200,
      message: 'Token generated successfully',
      data: {
        token,
        uniqueTokenHash,
      },
    };
  }

  /**
   * @description function to verify a user token
   * @param {String} userId - The user id
   * @param {String} token - The token to be verified
   * @param {String} verificationTypePrefix - The verification type prefix
   * @param {Number} maxTrials - The maximum number of trials
   * @param {Number} expiryMinutes - The expiry minutes
   * @return {Object} Returned object
   */
  static async verifyUserToken(
    userId,
    token,
    verificationTypePrefix,
    maxTrials = keys.VERIFICATION.MAX_TRAILS,
    expiryMinutes = keys.VERIFICATION.EXPIRY_TIME
  ) {
    try {
      const uniqueTokenHashToHash = `${userId}${token}`;
      const hashToken = this.deterministicHash(userId, uniqueTokenHashToHash);

      const verification =
        await VerificationRepo.findVerificationByUserIdAndVerificationType(
          userId,
          verificationTypePrefix
        );

      if (!verification) {
        return { statusCode: 404, message: 'Please request a new otp.' };
      }

      const expiryDate = new Date(verification.expiryTime);
      expiryDate.setMinutes(expiryDate.getMinutes() + expiryMinutes);

      if (new Date() > expiryDate) {
        return {
          statusCode: 410,
          message: 'The provided otp has expired, please request a new one.',
        };
      }

      if (verification.token !== hashToken) {
        verification.trials += 1;
        await verification.save();
        return verification.trials > maxTrials
          ? { statusCode: 429, message: 'Maximum trial attempts exceeded.' }
          : { statusCode: 400, message: 'The provided token is incorrect.' };
      }
      await VerificationRepo.deleteVerificationById(verification._id);
      return {
        statusCode: 200,
        message: 'Verification successful.',
        verified: true,
      };
    } catch (error) {
      logger.error(`verifyUserToken -> error: ${error.message}`);
      return {
        statusCode: 500,
        message: 'An error occurred while verifying the token.',
      };
    }
  }

  /**
   * @description function to check if a id is a valid ObjectId
   * @param {String} id - The id to be checked
   * @return {Boolean} Returned object
   */
  static validObjectId(id) {
    return ObjectId.isValid(id);
  }

  /**
   * @description function to transform business hours
   * @param {Object} hours - The hours to be transformed
   * @return {Object} Returned object
   */
  static async transformBusinessHours(hours) {
    const daysOfWeek = [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ];
    const transformedHours = daysOfWeek.map((day) => ({
      day,
      open: hours[day].open,
      close: hours[day].close,
      isOpen24Hours: hours[day].isOpen24Hours,
    }));
    return transformedHours;
  }
}