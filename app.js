const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const logger = require('morgan');
const supplierRoutes = require('./routes/supplierRoutes');
const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
const itemController = require('./controllers/itemController')
const app = express();
const port = 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger('dev'));

app.use(express.static("views"));

app.use('/api/user/', userRoutes);
app.use('/api/supplier/', supplierRoutes);
app.use('/api/item/', itemRoutes);

// set up mongoose
mongoose.connect('mongodb+srv://ronen:QWeasd123@cluster0.lw2akjb.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('Database connected');
    })
    .catch((error) => {
        console.log('Error connecting to database');

    });


app.get('/health', (req, res) => {
    res.status(200).json({
        message: 'Hello, Team',
    });
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/item-listing/:searchText', (req, res) => {
    const searchText = req.params.searchText;
    const cloneRes = {}
    if (searchText) {
        itemController.getSearchedItems({body: {searchText:searchText}}, cloneRes)
    }
    console.log(cloneRes)
    res.sendFile(__dirname + '/views/item-listing.html');
})

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', (req, res) => {
    res.status(404).sendFile(__dirname + '/views/404.html');
});

app.listen(port, () => {
    console.log(`Our server is running on port ${port}`);
});

// https://medium.com/fbdevclagos/developing-basic-crud-operations-with-node-express-and-mongodb-e754acb9cc15
