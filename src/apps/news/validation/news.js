import Joi from "joi";
import JoiObjectId from "joi-objectid";


Joi.objectId = JoiObjectId(Joi);


export const createNewsSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    category: Joi.string().valid('General', 'Leave', 'Holiday', 'NewJoiner').required(),
    author: Joi.objectId(),
    publishDate: Joi.date(),
});

