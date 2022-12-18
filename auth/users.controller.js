const uuid = require('uuid');
const crypto = require('../tools/crypto.js');
const teams = require('../teams/teams.controller');
const mongoose = require('mongoose');
const { to } = require('../tools/to');

const UserModel = mongoose.model('UserModel', 
    { userName: String, password: String, userId: String });

const cleanUpUsers = () => {
    return new Promise(async (resolve, reject) => {
        await UserModel.deleteMany({}).exec();
        resolve();
    })
}

const registerUser = (userName, password) => {
    return new Promise(async (resolve, reject) => {
        let hashedPwd = crypto.hashPasswordSync(password);
        // Save user on MongoDB
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

const getUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let [err, result] = await to(UserModel.findOne({userId: userId}).exec());
        if (err) {
            return reject(err);
        }
        resolve(result);
    });
}

const getUserIdFromUserName = (userName) => {
        return new Promise(async (resolve, reject) => {
            let [err, result] = await to(UserModel.findOne({userName: userName}).exec());
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
}

const checkUserCredentials = (userName, password) => {
    return new Promise(async (resolve, reject) => {
        let [err, user] = await to(getUserIdFromUserName(userName));
        if (!err || user) {
            crypto.comparePassword(password, user.password, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        } else {
            reject(err);
        }
    });
}

// To acces production database and register a sample user:
/*
registerUser('zvdy', '1234').then(() => {
    console.log('User zvdy registered ✅');
}).catch((err) => {
    console.log(err);
});

registerUser('ash', '4321').then(() => {
    console.log('User ash registered ✅');
}).catch((err) => {
    console.log(err);
});
*/


exports.registerUser = registerUser;
exports.checkUserCredentials = checkUserCredentials;
exports.getUserIdFromUserName = getUserIdFromUserName;
exports.getUser = getUser;
exports.cleanUpUsers = cleanUpUsers;