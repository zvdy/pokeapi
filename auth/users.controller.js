const uuid = require('uuid');
const crypto = require('../tools/crypto.js');
const teams = require('../teams/teams.controller');
const mongoose = require('mongoose');

const UserModel = mongoose.model('UserModel', 
    { userName: String, password: String, userId: String });
    

let userDatabase = {};
// userId -> userData

// promise to clean up the user database
const cleanUpUsers = () => {
    return new Promise((resolve, reject) => {
        userDatabase = {};
        resolve();
    })
}


// Register a new user in the database and create a team for them as well (see teams.controller.js)
const registerUser = (userName, password) => {
    return new Promise(async (resolve, reject) => {
        let hashedPwd = crypto.hashPasswordSync(password);
        // Save user to database
        let userId = uuid.v4();
        let newUser = new UserModel({
            userId: userId,
            userName: userName,
            password: hashedPwd
        });
        await newUser.save();

        await teams.bootstrapTeam(userId);
        resolve();
    });
}

// ALERT This loads the user into mongoDB, make sure to run this once or you will have duplicate users !!!
// registerUser('zvdy', '1234');

// Get user data from database by userId
const getUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let [err, result] = await to (UserModel.findOne({userId: userId}).exec());
        if (err) {
            reject(err);
        }
        resolve(result);
    });
}

// Get user data from database by userName
const getUserIdFromUserName = (userName) => {
    return new Promise(async (resolve, reject) => {
        let [err, result] = await to (UserModel.findOne({userName: userName}).exec());
        if (err) {
            reject(err);
        }
        resolve(result);
    });
}


// Check if the password is correct for a given user (by userName)
const checkUserCredentials = (userName, password) => {
    return new Promise(async (resolve, reject) => {
        let user = await getUserIdFromUserName(userName);
        if (user) {
            crypto.comparePassword(password, user.password, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        } else {
            reject('Missing user');
        }
    });
}

exports.registerUser = registerUser;
exports.checkUserCredentials = checkUserCredentials;
exports.getUserIdFromUserName = getUserIdFromUserName;
exports.getUser = getUser;
exports.cleanUpUsers = cleanUpUsers;