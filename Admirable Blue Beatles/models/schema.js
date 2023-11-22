import mongoose from 'mongoose';

const articleSchema = mongoose.Schema({
    type: String,
    name: String,
    born: { type: String, default: null },
    died: { type: String, default: null },
    nationality: { type: String, default: null },
    knownFor: { type: String, default: null },
    notableWork: { type: String, default: null },
    about: { type: String, default: null },
    year: { type: String, default: null },
    medium: { type: String, default: null },
    dimensions: { type: String, default: null },
    location: { type: String, default: null },
    designedBy: { type: String, default: null },
    developer: { type: String, default: null }
});

const subjectSchema = mongoose.Schema({
    name: String,
    articles: [articleSchema]
});

const SubjectModel = mongoose.model('Subject', subjectSchema);


async function getAllData(){
    try {
        const result =await SubjectModel.find()
        return result
    } catch (error) {
        console.error("Error fetching documents:", error);
        throw error
    }
}


export { SubjectModel, getAllData };
