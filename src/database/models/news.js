import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const NewsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            enum: ['General', 'Leave', 'Holiday', 'NewJoiner'],
            required: true,

        },
        author: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User',
        },
        publishDate: { type: Date, default: Date.now }
    },

);

NewsSchema.plugin(mongoosePaginate);
const NewsModel = mongoose.model('News', NewsSchema);

export default NewsModel;
