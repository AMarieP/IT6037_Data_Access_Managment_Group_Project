import mongoose from 'mongoose';
import { subjectModel } from './subject';

const digitalResourceSchema = mongoose.Schema({
    subjects: [subjectModel]
});

const digitalResourceModel = mongoose.model('digitalResource', digitalResourceSchema)
module.exports = digitalResourceModel;