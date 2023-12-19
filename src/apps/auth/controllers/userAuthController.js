import UserAuthService from '../services/userAuthService';
import { errorResponse, successResponse } from '../../../utils/response';
import { errorResponseMessage } from '../../../utils/constant/options';

/**
 * @description Authentication Controller
 */

export default class UserController {
  /**
   * @description return a JSON data
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async createUserAuthController(req, res) {
    try {
      const { body } = req;
      const result = await UserAuthService.createUserAuthService(body);
      if (result.statusCode !== 201)
        return errorResponse(res, result.statusCode, result.message);
      logger.info(
        `createUserController -> info: User created with email: ${JSON.stringify(
          result
        )}`
      );
      return successResponse(
        res,
        201,
        'User created successfully',
        result.data
      );
    } catch (error) {
      logger.error(`createUserController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description controller to login a user
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async loginUserAuthController(req, res) {
    try {
      const { body } = req;
      const result = await UserAuthService.loginUserAuthService(body);

      if (result.statusCode !== 200)
        return errorResponse(res, result.statusCode, result.message);

      logger.info(
        `loginUserController -> info: User logged in with email: ${JSON.stringify(
          result
        )}`
      );

      return successResponse(
        res,
        200,
        'User logged in successfully',
        result.data
      );
    } catch (error) {
      logger.error(`loginUserController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

}
