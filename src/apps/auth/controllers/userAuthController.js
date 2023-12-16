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

  /**
   * @description controller to change password
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async changePasswordController(req, res) {
    try {
      const { body, user } = req;
      const result = await UserAuthService.changePasswordService(user, body);
      if (result.statusCode == 401)
        return errorResponse(res, result.statusCode, result.message);
      logger.info(
        `changePasswordController -> info: User changed password successfully with email: ${JSON.stringify(
          result
        )}`
      );
      return successResponse(
        res,
        result.statusCode,
        'User changed password successfully',
        result.data
      );
    } catch (error) {
      logger.error(`changePasswordController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description controller to forget password
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async forgotPasswordController(req, res) {
    try {
      const { query } = req;
      const result = await UserAuthService.forgotPasswordService(query);
      if (result.statusCode !== 200)
        return errorResponse(res, result.statusCode, result.message);
      logger.info(
        `forgotPasswordController -> info: User forgot password with email: ${JSON.stringify(
          result
        )}`
      );
      return successResponse(res, 200, result.message, result.data);
    } catch (error) {
      logger.error(`forgotPasswordController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description controller to verify code
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async verifyMobileOtpController(req, res) {
    try {
      const { user, body } = req;
      const result = await UserAuthService.verifyMobileOtpService(body, user);
      if (result.statusCode !== 200)
        return errorResponse(res, result.statusCode, result.message);
      logger.info(
        `verifyMobileOtpController -> info: User verify code with email: ${JSON.stringify(
          result
        )}`
      );
      return successResponse(res, 200, result.message, result.data);
    } catch (error) {
      logger.error(`verifyMobileOtpController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description controller to reset password
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */

  static async resetPasswordController(req, res) {
    try {
      const { body, params } = req;
      const result = await UserAuthService.resetPasswordService(
        body,
        params.token
      );
      if (result.statusCode !== 200)
        return errorResponse(res, result.statusCode, result.message);
      logger.info(
        `resetPasswordController -> info: User reset password with email: ${JSON.stringify(
          result
        )}`
      );
      return successResponse(res, 200, 'User reset password successfully');
    } catch (error) {
      logger.error(`resetPasswordController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }
}
