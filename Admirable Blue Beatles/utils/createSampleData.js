import { SubjectModel } from "../models/schema.js";

const sampleData = {
    subjects: [
        {
            name: "Art",
            articles: [
                {
                    type: "Biography",
                    name: "Claude Monet",
                    born: "1840",
                    died: "1926",
                    nationality: "French",
                    knownFor: "Painter",
                    notableWork: "Water Lilies",
                    about: "Oscar-Claude Monet was a French painter, a founder of French Impressionist painting...",
                    year: null,
                    medium: null,
                    dimensions: null,
                    location: null,
                    designedBy: null,
                    developer: null
                },
                {
                    type: "Biography",
                    name: "Leonardo da Vinci",
                    born: "1452",
                    died: "1519",
                    nationality: "Italian",
                    knownFor: "Art and Science",
                    notableWork: "Mona Lisa, The Last Supper",
                    about: "Leonardo di ser Piero da Vinci, more commonly Leonardo da Vinci, was an Italian polymath of the Renaissance...",
                    year: null,
                    medium: null,
                    dimensions: null,
                    location: null,
                    designedBy: null,
                    developer: null
                },
                {
                    type: "Painting",
                    name: "Mona Lisa",
                    born: null,
                    died: null,
                    nationality: null,
                    knownFor: null,
                    notableWork: null,
                    about: "The Mona Lisa is a half-length portrait painting by the Italian Renaissance artist Leonardo da Vinci...",
                    year: "1503-1506",
                    medium: "Oil on poplar panel",
                    dimensions: "77cm x 53 cm",
                    location: "Musee du Louvre, Paris",
                    designedBy: null,
                    developer: null
                }
            ]
        },
        {
            name: "Mathematics",
            articles: [
                {
                    type: "Theorem",
                    name: "Pythagorean theorem",
                    born: null,
                    died: null,
                    nationality: null,
                    knownFor: null,
                    notableWork: null,
                    about: "In mathematics, the Pythagorean theorem, also known as Pythagoras' theorem, is a fundamental relation in Euclidean geometry...",
                    year: null,
                    medium: null,
                    dimensions: null,
                    location: null,
                    designedBy: null,
                    developer: null
                },
                {
                    type: "Biography",
                    name: "Euclid",
                    born: "4th century BC",
                    died: "3rd century BC",
                    nationality: null,
                    knownFor: "Euclidean geometry",
                    notableWork: null,
                    about: "Euclid, sometimes given the name Euclid of Alexandria to distinguish him from Euclides of Megara...",
                    year: null,
                    medium: null,
                    dimensions: null,
                    location: null,
                    designedBy: null,
                    developer: null
                },
                {
                    type: "Algorithm",
                    name: "Quicksort",
                    born: null,
                    died: null,
                    nationality: null,
                    knownFor: null,
                    notableWork: null,
                    about: "Quicksort (sometimes called partition-exchange sort) is an efficient sorting algorithm...",
                    year: null,
                    medium: null,
                    dimensions: null,
                    location: null,
                    designedBy: null,
                    developer: null
                }
            ]
        },
        {
            name: "Technology",
            articles: [
                {
                    type: "Biography",
                    name: "Bill Gates",
                    born: "1955",
                    died: null,
                    nationality: "USA",
                    knownFor: "Founder of the Microsoft Corporation",
                    notableWork: null,
                    about: "William Henry Gates III is an American business magnate, investor, author, philanthropist...",
                    year: null,
                    medium: null,
                    dimensions: null,
                    location: null,
                    designedBy: null,
                    developer: null
                },
                {
                    type: "Biography",
                    name: "Steve Jobs",
                    born: "1955",
                    died: "2011",
                    nationality: "USA",
                    knownFor: "Co-creator of the Macintosh, iPod, iPhone, iPad, and first Apple Stores",
                    notableWork: null,
                    about: "Steven Paul Jobs was an American entrepreneur and business magnate...",
                    year: null,
                    medium: null,
                    dimensions: null,
                    location: null,
                    designedBy: null,
                    developer: null
                },
                {
                    type: "Programming Language",
                    name: "Java",
                    born: null,
                    died: null,
                    nationality: null,
                    knownFor: null,
                    notableWork: null,
                    about: "Java is a general-purpose computer-programming language that is concurrent, class-based, object-oriented...",
                    year: null,
                    medium: null,
                    dimensions: null,
                    location: null,
                    designedBy: "James Gosling",
                    developer: "Sun Microsystems"
                }
            ]
        }
    ]
};


export { sampleData };
