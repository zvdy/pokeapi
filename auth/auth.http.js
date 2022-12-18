const usersController = require('./users.controller');
const jwt = require('jsonwebtoken');
const {to} = require('../tools/to');

const loginUser = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({message: 'Missing data'});
    } else if (!req.body.user || !req.body.password) {
        return res.status(400).json({message: 'Missing data'});
    }
    // check if user and password are valid
    let [err, resp] = await to(usersController.checkUserCredentials(req.body.user, req.body.password));
    // If not, return 401 error
    if (err || !resp) {
        return res.status(401).json({message: 'Invalid credentials'});
    }
    // If they are valid, create a token
    let user = await usersController.getUserIdFromUserName(req.body.user);
    const token = jwt.sign({userId: user.userId}, 'secretPassword');
    res.status(200).json(
        {token: token}
    )
}

exports.loginUser = loginUser;