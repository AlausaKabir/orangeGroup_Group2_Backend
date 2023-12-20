import Joi from "joi";

export const createNewsSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    category: Joi.string().valid('General', 'Leave', 'Holiday', 'NewJoiner').required(),
});

export const newsByIdSchema = Joi.object({
    id: Joi.string().hex().required(),
})

export const getAllNewsQuerySchema = Joi.object({
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(100),
    category: Joi.string().valid('General', 'Leave', 'Holiday', 'NewJoiner'),
});

export const updateNewsSchema = Joi.object({
    id: Joi.string().hex().required(),
    title: Joi.string(),
    content: Joi.string(),
    category: Joi.string().valid('General', 'Leave', 'Holiday', 'NewJoiner'),
})
