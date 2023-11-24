import mongoose from 'mongoose';
import { articleModel } from './article';


const subjectSchema = mongoose.Schema({
    name: String,
    articles: [articleModel]
});

const subjectModel = mongoose.model('subject', subjectSchema)
module.exports = subjectModel;