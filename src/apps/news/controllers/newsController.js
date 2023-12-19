import NewsService from '../services/newsService';
import { errorResponse, successResponse } from '../../../utils/response';
import { errorResponseMessage } from '../../../utils/constant/options';


/**
 * @description News Controller
 */

export default class newsController {
    /**
     * @description return a JSON data
     * @param {Object} req - HTTP Request
     * @param {Object} res - HTTP Response
     * @return {Object} Returned Object
     */

    static async createNewsController(req, res) {
        try {
            const { body } = req
            const result = await NewsService.createNewsService(body)
            if (result.statusCode !== 201)
                return errorResponse(res, result.statusCode, result.message)
            logger.info(`createNewsController -> info: ${JSON.stringify(result)}`)
            return successResponse(res, 201, 'News created successfully', result.data)
        } catch (error) {
            logger.error(`createNewsController -> error: ${error.message}`)
            return errorResponse(res, 500, errorResponseMessage)
        }
    }

    static async getAllNews(req, res) {
        const { user } = req

        const { page = 1, limit = 20 } = req.query
        try {
            const news = await NewsService.getAllNewsService(user, { page, limit })
            logger.info(`getAllNewsController -> news: ${JSON.stringify(news)}`)
            return successResponse(res, news.statusCode, news.message, news.data)

        } catch (error) {
            logger.error(`getAllNewsController -> error: ${error.message}`)
            return errorResponse(res, 500, errorResponseMessage)
        }
    }


    static async getNewsByIdController(req, res) {
        const { newsId } = req.params;

        try {
            const result = await NewsService.getNewsByIdService(newsId);

            if (result.statusCode !== 200) {
                return errorResponse(res, result.statusCode, result.message);
            }

            logger.info(`getNewsByIdController -> news: ${JSON.stringify(result.data)}`);
            return successResponse(res, result.statusCode, result.message, result.data);
        } catch (error) {
            logger.error(`getNewsByIdController -> error: ${error.message}`);
            return errorResponse(res, 500, errorResponseMessage);
        }
    }

}