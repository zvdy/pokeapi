const mongoose = require('mongoose');
let username = 'username_mongoDBAtlas';
let password = 'password_mongoDBAtlas';
let databaseName = 'db';
if (process.env.NODE_ENV === 'test') {
    databaseName = 'testdb';
}

mongoose.connect(`mongodb+srv://${username}:${password}<YOUR_CLUSTER>.mongodb.net/${databaseName}`, 
    {useNewUrlParser: true, useUnifiedTopology: true});