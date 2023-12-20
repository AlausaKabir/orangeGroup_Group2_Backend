import NewsRepo from '../../../database/repository/newsRepo'
import UserRepo from '../../../database/repository/userRepo'
import { NewsModel } from '../../../database/models';
import HelperFunctions from '../../../utils/helperFunctions';
/**
 * @description News Service Class
 */


export default class NewsService {
    /**
     * @description function to create News by User
     * @param {Object} data - the News data
     * @return {Object} - Returns an Object
     */
    static async createNewsService(data, user) {
        const { title, content, category } = data
        const newTitle = HelperFunctions.capitalizeFirstLetters(title)

        try {
            const newsExist = await NewsRepo.findNewsByTitle(newTitle)
            if (newsExist)
                return {
                    statusCode: 409,
                    message: 'News already exist'
                }

            const newNews = { title: newTitle, content, category, author: user.id || user._id }

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


    static async getAllNewsService(query) {
        const { page = 1, limit = 20, category } = query;

        const options = {
            page: parseInt(page, 10) || 1,
            limit: parseInt(limit, 10) || 20,
            sort: { createdAt: -1 },
        };

        const queryConditions = category ? { category: { $regex: new RegExp(category, 'i') } } : {};

        try {
            const news = await NewsRepo.getAllNews({ ...options, queryConditions });

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


    static async getNewsByIdService(data) {
        const { id } = data
        console.log(data, 'data');
        try {
            const news = await NewsRepo.findNewsById(id);

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

    static async updateNewsService(param, data) {
        const { id } = param
        try {
            // Check if the news article exists
            const existingNews = await NewsRepo.findNewsById(id);
            if (!existingNews) {
                return {
                    statusCode: 404,
                    message: 'News not found',
                };
            }

            if (data.title)
                data.title = HelperFunctions.capitalizeFirstLetters(data.title)

            const newsExist = await NewsRepo.findNewsByTitle(data.title)
            if (newsExist && newsExist._id.toString() === existingNewsId.toString())
                return {
                    statusCode: 409,
                    message: 'News already exist'
                }


            const updatedNews = await NewsRepo.updateNews(id, data);

            logger.info(`updateNewsService -> updatedNews: ${JSON.stringify(updatedNews)}`);

            return {
                statusCode: 200,
                message: 'News updated successfully',
                data: updatedNews,
            };
        } catch (error) {
            logger.error(`updateNewsService -> error: ${error.message}`);
            throw error;
        }
    }

    static async deleteNewsService(newsId) {
        try {
            const existingNews = await NewsRepo.findNewsById(newsId);
            if (!existingNews) {
                return {
                    statusCode: 404,
                    message: 'News not found',
                };
            }

            await NewsRepo.deleteNews(newsId);

            logger.info(`deleteNewsService -> News deleted successfully with ID: ${newsId}`);

            return {
                statusCode: 200,
                message: 'News deleted successfully',
            };
        } catch (error) {
            logger.error(`deleteNewsService -> error: ${error.message}`);
            throw error;
        }
    }

}