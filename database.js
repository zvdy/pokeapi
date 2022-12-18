const mongoose = require('mongoose');
let password = 'yourpassword';
let username = 'yourusername';
let databaseName = 'db';

mongoose.connect('mongodb+srv://<username>:<password>@cluster0.vum557a.mongodb.net/?retryWrites=true&w=majority', 
    {useNewUrlParser: true, useUnifiedTopology: true});