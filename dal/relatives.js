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
const addRelative = (relative) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(DB_URL, settings, function(err, client) {
            if(err){
                reject(err);
            } else {
                console.log('Connected to DB Server for CREATE');
                const db = client.db(dbName);
                const collection = db.collection(colName);
                collection.insertOne(relative, (err, result) => {
                    if(err){
                        reject(err);
                    } else{
                        resolve(result.ops[0]);
                        client.close();
                    }
                })
            }
        })
    })
    return iou;
};
//UPDATE functions, depicting two ways to handle IDs
const updateRelativeValues = (relative) => {};  //PATCH
const updateRelative = (id, relative) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(DB_URL, settings, function (err, client) {
            if (err) {
                reject(err);
            } else {
                console.log('Connected to DB Server for PUT');
                const db = client.db(dbName);
                const collection = db.collection(colName);
                collection.replaceOne({_id: ObjectID(id)}, 
                    relative,
                    { upsert: true },
                    (err, result) => {
                        if(err){
                            reject(err);
                        } else{
                            resolve({ updated_id: id });
                            client.close();
                        }
                    }
                );
            }
        })
    })
    return iou;
};    //PUT, UPSERT
//DELETE functions
const deleteRelative = (id) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(DB_URL, settings, function (err, client) {
            if (err) {
                reject(err);
            } else {
                console.log('Connected to DB Server for DELETE');
                const db = client.db(dbName);
                const collection = db.collection(colName);
                collection.deleteOne({ _id: ObjectID(id) }, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ deleted_id: id });    //TODO: clip down result
                        client.close();
                    }
                })
            }
        })
    })
    return iou;
};

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