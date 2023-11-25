const { MongoClient } = require('mongodb')

let dbConnection

uri = 'mongodb+srv://alyssa:sy4xg8y3NV5sexXQ@bookshop.84nmo8y.mongodb.net/'


module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(uri)
        .then((client) => {
            dbConnection = client.db()
            return cb()
        })
        .catch(err => {
            console.log(err)
            return cb(err)

        })
    },
    getDB: () => dbConnection
}