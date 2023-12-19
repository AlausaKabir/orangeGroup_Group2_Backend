import NewsRepo from '../../../database/repository/newsRepo'
import { NewsModel } from '../../../database/models';
/**
 * @description News Service Class
 */


export default class NewsService {
    /**
     * @description function to create News by User
     * @param {Object} data - the News data
     * @return {Object} - Returns an Object
     */
    static async createNewsService(data) {
        const { title, content, category, author } = data
        try {
            const newsExist = await NewsRepo.findNewsByTitle(title)
            if (newsExist)
                return {
                    statusCode: 409,
                    message: 'News already exist'
                }

            const newNews = { title, content, category, author }

            const createNewNews = await NewsRepo.createNews(newNews)

            logger.info(`createNewsService -> info: News created successfully: ${JSON.stringify(createNewNews)}`)

            return {
                statusCode: 201,
                message: 'News created successfully',
                data: createNewNews
            }
        } catch (error) {
            logger.error(`createNewsService -> error ${error.message}`)
            throw error
        }
    }


    static async getAllNewsService(user, query) {
        const { page = 1, limit = 20 } = query;

        const options = {
            page: parseInt(page, 10) || 1,
            limit: parseInt(limit, 10) || 20,
            sort: { createdAt: -1 },
        };

        try {
            const news = await NewsModel.paginate({}, options);

            logger.info(`getAllNewsService -> news: ${JSON.stringify(news)}`);

            return {
                statusCode: 200,
                message: 'All news retrieved successfully',
                data: news,
            };
        } catch (error) {
            logger.error(`getAllNewsService -> error: ${error.message}`);
            throw error;
        }
    }

    static async getNewsByIdService(newsInput) {
        try {
            const news = await NewsRepo.findNewsById({ id: newsInput.id || newsInput._id });

            if (!news) {
                return {
                    statusCode: 404,
                    message: 'News not found',
                };
            }

            return {
                statusCode: 200,
                message: 'News retrieved successfully',
                data: news,
            };
        } catch (error) {
            logger.error(`getNewsByIdService -> error: ${error.message}`);
            throw error;
        }
    }

}