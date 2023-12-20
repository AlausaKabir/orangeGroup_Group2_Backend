import UserRepo from '../../../database/repository/userRepo';
import Token from '../../../utils/jwt/userToken';
import HelperFunctions from '../../../utils/helperFunctions';

/**
 * @description Auth Service class
 */
export default class UserAuthService {
  /**
   * @description function to signup user
   * @param {object} data - The user data
   * @returns {object} - Returns an object
   */
  static async createUserAuthService(data) {
    const { firstName, lastName, email, phone, password } = data;
    try {

      const userExist = await UserRepo.findUserByEmailOrPhone(email, phone);

      if (userExist)
        return {
          statusCode: 409,
          message: 'User already registered',
        };

      const hashedPassword = HelperFunctions.hashPassword(password);

      const newUser = {
        email: email.toLowerCase(),
        firstName: HelperFunctions.capitalizeFirstLetters(firstName),
        lastName: HelperFunctions.capitalizeFirstLetters(lastName),
        phone: phone,
        password: hashedPassword,
      };

      const createNewUser = await UserRepo.createUser(newUser);

      createNewUser.password = undefined;

      logger.info(
        `createUserService -> info: User created with email: ${JSON.stringify(
          createNewUser
        )}`
      );

      return {
        statusCode: 201,
        message: 'User created successfully',
        data: createNewUser,
      };
    } catch (error) {
      logger.error(`createUserService -> error: ${error.message}`);
      throw error
    }
  }

  /**
   * @description - This method is used to login a user
   * @param {object} data - The user data
   * @returns {object} - Returns an object
   */
  static async loginUserAuthService(data) {
    let user;
    const { email, password, phone } = data;

    user = await UserRepo.findUserByEmailOrPhone(email, phone);

    if (!user)
      return {
        statusCode: 409,
        message: 'Invalid Credentials',
      };

    const isPasswordValid = await HelperFunctions.comparePassword(
      password,
      user.password
    );

    if (!isPasswordValid)
      return {
        statusCode: 409,
        message: 'Invalid Credentials',
      };

    user = await UserRepo.findUserById(user._id);

    const accessToken = Token.userGenerateToken(user);
    logger.info(
      `loginUserService -> info: User logged in with email:  ${JSON.stringify(
        user.email
      )}`
    );
    user.password = undefined;
    return {
      statusCode: 200,
      message: 'User logged in successfully',
      data: {
        user,
        accessToken,
      },
    };
  }
}
