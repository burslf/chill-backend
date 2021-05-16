const { getDb } = require('../config/dbConnection')
const ObjectID = require('mongodb').ObjectID;

exports.addUser = async (user) => {
    const _db = getDb();
    try {
        const collection = _db.collection('users');
        const result = await collection.insertOne(user);
        return result;
    } catch {
        return null;
    }
}

exports.getAllUsers = async () => {
    const _db = getDb();
    try {
        const collection = _db.collection('users');
        const result = await collection.find({}, { projection: { password: 0 } }).toArray();
        return result;
    } catch {
        return null;
    }
}

exports.getUserById = async (_id) => {
    const _db = getDb();
    try {
        const collection = _db.collection('users');
        const user = await collection.findOne({ "_id": ObjectID(_id) });
        return user;
    } catch {
        return null;
    }
}

exports.getUserByEmail = async (email) => {
    const _db = getDb();
    try {
        const collection = _db.collection('users');
        const user = await collection.findOne({ "email": email });
        return user;
    } catch {
        return null;
    }
}