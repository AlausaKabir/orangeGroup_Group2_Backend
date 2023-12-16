import {ClientError} from "../middleware/error/client.error";
import HelperFunctions from "../utils/helperFunctions";

const AppValidation = {
  /**
   * joi validation
   * @param schema
   * @param request
   * @param response
   * @param next
   */
  async bodyBaseValidator(request, response, next, schema) {
    try {
      request.body = await schema.validateAsync(request.body);
      return next();
    } catch (error) {
      return next(
          new ClientError(
              HelperFunctions.replaceValue(error.message, /["]/gi, '')
          )
      );
    }
  },
};
export default AppValidation;
