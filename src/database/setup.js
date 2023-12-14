import dotenv from 'dotenv'
import mongoose from 'mongoose'
import keys from '../config/keys'

dotenv.config()


const connectionString = keys.DATABASE.MONGODB[keys.ENVIRONMENT.toUpperCase()].CONNECTION_STRING

const MongoConnection = async () => {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        logger.info('Connected to MongoDB!:)')
    } catch (error) {
        logger.error('Erro connecting to MongoDB:', error)
    }
}

export default MongoConnection