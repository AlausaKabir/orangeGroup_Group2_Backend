import express from 'express'
import newsController from '../controllers/newsController'
import validate from '../../../validation/validatorClass'
import { createNewsSchema } from '../validation/news'

const router = express.Router()

router.post(
    '/',
    validate(createNewsSchema),
    newsController.createNewsController
)

router.get('/all',
    newsController.getAllNews)


router.get('/', newsController.getNewsByIdController)


export default router