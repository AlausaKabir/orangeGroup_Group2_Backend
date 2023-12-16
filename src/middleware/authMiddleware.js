import { errorResponse } from '../utils/response';
import UserToken from '../utils/jwt/userToken';
import UserRepo from '../database/repository/userRepo';
import { USER_TYPE } from '../utils/constant/options';

/**
 * @description Authentication Controller class
 */
export default class AuthenticationMiddleware {
  /**
   * @description return a JSON data
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @param {Function} next - Next function
   * @return {Object} Returned object
   */
  static async isUserAuthenticated(req, res, next) {
    try {
      const { authorization } = req.headers;

      if (!authorization) {
        return errorResponse(res, 499, 'Token required');
      }

      const token = await UserToken.decodeToken(
        authorization.toString().substr(7)
      );

      if (!token) {
        return errorResponse(res, 498, 'Invalid token');
      }

      const user = await UserRepo.findUserById(token.subject, true);

      if (!user) {
        return errorResponse(res, 401, 'Invalid user token');
      }

      req.user = { ...user, userType: USER_TYPE.USER };

      return next();
    } catch (err) {
      logger.error(
        `Error in authenticating user: ${JSON.stringify(err.message)}`
      );
      return errorResponse(res, 500, 'Invalid Or Expired Token');
    }
  }
}
