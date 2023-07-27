//Loading Modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const router = express.Router();
require('dotenv').config();

const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

//Creating Database connection
mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser:true, useUnifiedTopology:true });
const db = mongoose.connection;

db.on('error', (error) => (console.error(error)))
db.once('open', () => console.log('Connected to Database'))
app.use(express.json());
app.use(cors('*'))

const UserRoutes = require("./routes/user.route");
router.use('/user',UserRoutes);

app.use('/api',router);

//Listening on port 3000
app.listen(port, ()=> console.log("Server Listening on port",port));