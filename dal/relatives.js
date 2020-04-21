const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const DB_URL = process.env.DB_URL;

const dbName = 'rolodex';
const colName = 'relatives';
const settings= {useUnifiedTopology: true};

//READ functions
const getRelatives = () => {
    const iou = new Promise ((resolve, reject) => {
        MongoClient.connect(DB_URL, settings, function(err, client){
            if(err){
                reject(err);
            }else{
                console.log('Connected to DB Server for READ');
                const db = client.db(dbName);
                const collection = db.collection(colName);
                collection.find({}).toArray(function(err, docs){
                    if (err) {
                        reject(err);
                    } else {
                        // console.log(docs);
                        resolve(docs);
                        client.close();
                    };
                });
            };
        });
    });
    return iou;
};
const getRelativeById = (id) => {};
const getRelativeByValue = (key, value) => {};
//CREATE function
const addRelative = (relative) => {};
//UPDATE functions, depicting two ways to handle IDs
const updateRelativeValues = (relative) => {};  //PATCH
const updateRelative = (id, relative) => {};    //PUT, UPSERT
//DELETE functions
const deleteRelative = (id) => {};

// Still needs Exports
module.exports = {
    getRelatives,
    getRelativeById,
    getRelativeByValue,
    addRelative,
    updateRelativeValues,
    updateRelative,
    deleteRelative
};