import express from 'express'
import NewsController from '../controllers/newsController'
import validate from '../../../validation/validatorClass'
import AuthenticationMiddleware from '../../../middleware/authMiddleware'
import { createNewsSchema, newsByIdSchema, updateNewsSchema } from '../validation/news'

const router = express.Router()

router.post(
    '/',
    // AuthenticationMiddleware.isUserAuthenticated,
    validate(createNewsSchema),
    NewsController.createNewsController
)

router.get('/all',
    // AuthenticationMiddleware.isUserAuthenticated,
    NewsController.getAllNews
)


router.get('/:id',
    validate(newsByIdSchema),
    NewsController.getNewsByIdController
)

router.put('/:id',
    validate(updateNewsSchema),
    NewsController.updateNewsController
);

router.delete('/:id', validate(newsByIdSchema), NewsController.deleteNewsController);


export default router