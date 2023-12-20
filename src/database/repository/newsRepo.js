import { NewsModel } from "../models";

/**
 * @fileoverview NewsRepo class for news-related database operations.
 */

export default class NewsRepo {
    /**
     * @description Create a new News in the database 
     * @param {Object} data - News data to be created 
     * @returns {Promise<Object>} A promise that resolves with the created object
     */
    static async createNews(data) {
        return NewsModel.create(data)
    }

    /**
     * @description Find a specific News in the database 
     * @param {Object} newsId - The ID of the news
     * @returns {Promise<Object|null>} A promise that resolves with the news object if found, or null if not found
     */
    static async findNewsById(id) {
        return NewsModel.findOne({ _id: id });
    }

    /**
     * @description Update a news' data in the database.
     * @param {string} newsId - The ID of the news to update.
     * @param {Object} updatedData - The updated news data.
     * @returns {Promise<Object|null>} A promise that resolves with the updated news object if found, or null if not found.
     */
    static updateNews(newsId, updatedData) {
        try {
            return NewsModel.findByIdAndUpdate({ _id: newsId }, updatedData, {
                new: true,
            });
        } catch (error) {
            logger.error(`NewsRepo updatenews database -> error: ${error.message}`);
            throw error;
        }
    }

    /**
  * @description Delete a News from the database by their ID.
  * @param {string} newsId - The ID of the News to delete.
  * @returns {Promise<Object|null>} A promise that resolves with the deleted News object if found, or null if not found.
  */
    static deleteNews(newsId) {
        try {
            return NewsModel.findByIdAndDelete(newsId);
        } catch (error) {
            logger.error(`NewsRepo deleteNews database -> error: ${error.message}`);
            throw error;
        }
    }

    static findNewsByTitle(title) {
        return NewsModel.findOne({ title })
    }


    static async getAllNews(options) {
        const { page, limit, sort, queryConditions } = options;

        return NewsModel.paginate(queryConditions, {
            page,
            limit,
            sort,
        });
    }
}

