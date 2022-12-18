const uuid = require('uuid');
const crypto = require('../tools/crypto.js');
const teams = require('../teams/teams.controller');

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
        userDatabase[userId] = {
            userName: userName,
            password: hashedPwd
        }
        await teams.bootstrapTeam(userId);
        resolve();
    });
}

// Get user data from database by userId
const getUser = (userId) => {
    return new Promise((resolve, reject) => {
        resolve(userDatabase[userId]);
    });
}

// Get user data from database by userName
const getUserIdFromUserName = (userName) => {
    return new Promise((resolve, reject) => {
        for (let user in userDatabase) {
            if (userDatabase[user].userName == userName) {
                let userData = userDatabase[user];
                userData.userId = user;
                return resolve(userData);
            }
        }
        reject('No user found');
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