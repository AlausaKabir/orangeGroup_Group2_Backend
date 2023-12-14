import jwt from 'jsonwebtoken';
import keys from '../../config/keys.js';
import UserModel from '../../database/models/user.js';
import { USER_TYPE } from '../constant/options';

/**
 * @description - This is a class that generates and verifies tokens
 */
export default class UserToken {
  /**
   * @description - This method is used to generate a token
   * @param {object} payload - The payload to be signed
   * @returns {string} - Returns a string
   * @memberof Token
   */
  static userGenerateToken(user) {
    const payload = {
      subject: user._id,
      email: user.email,
    };

    const options = {
      expiresIn: '1d',
    };
    try {
      const token = jwt.sign(payload, keys.JWT.SECRET, options);
      logger.info('token Successfully created');
      return token;
    } catch (err) {
      logger.error(`Error generating token ${JSON.stringify(err)}`);
      throw new Error(err.message);
    }
  }

  /**
   * @description - This method is used to verify a token
   * @param {string} token - The token to be verified
   * @returns {object} - Returns an object
   * @memberof Token
   */
  static decodeToken(token) {
    try {
      const decoded = jwt.verify(token, keys.JWT.SECRET);
      logger.info('token Successfully verified');
      return decoded;
    } catch (err) {
      logger.error(`Error verifying token ${JSON.stringify(err)}`);
      throw new Error(err.message);
    }
  }
}
