const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const supplierRoutes = require('./routes/supplierRoutes');
const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
const itemController = require('./controllers/itemController')
const userController = require('./controllers/userController')
const supplierController = require('./controllers/supplierController')

const path = require("path");
const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger('dev'));
app.set('view engine', 'ejs');

app.use('/public', express.static(path.join(__dirname, "public")));

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
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/views/index.html');
// });
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index2.html');
});
app.get('/women', (req, res) => {
    res.sendFile(__dirname + '/views/women.html');
});
// app.get('/men', (req, res) => {
    
//     res.sendFile(__dirname + '/views/men.html');
// });
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login2.html');
});
app.get('/items', (req, res) => {
    res.sendFile(__dirname + '/views/album.html');
});
 app.get('/single-item', (req, res) => {
     // res.sendFile(__dirname + '/views/single-item.html');
     const item_id= req.query.item_id
     res.sendFile(__dirname + "/views/single-item.html");
 });

app.get('/item-listing/:searchText', (req, res) => {
    const searchText = req.params.searchText;
    const cloneRes = {}
    if (searchText) {
        itemController.getSearchedItems({body: {searchText: searchText}}, cloneRes)
    }
    console.log(cloneRes)
    res.sendFile(__dirname + '/views/item-listing.html');
})


app.get('/women', (req, res) => {
    const searchText = req.params.kind;
    const cloneRes = {}
    if (searchText == women) {
        itemController.getitembykind({body: "women"}, cloneRes);
        res.sendFile(__dirname + '/views/women.html');
    }
    

    if (searchText == men) {
        itemController.getitembykind({body: "men"}, cloneRes);
        res.sendFile(__dirname + '/views/men.html');
    }
    console.log(cloneRes)
    
})



app.get('/admin2', async (req, res) => {
    res.render("../views/admin2.ejs", {data: {users: await userController.getAllUsers(), items: await itemController.innerGetAllItems(), suppliers: await supplierController.getAllSuppliers()}});

})

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', (req, res) => {
    res.status(404).sendFile(__dirname + '/views/404.html');
});

app.listen(port, () => {
    console.log(`Our server is running on port ${port}`);
});

// https://medium.com/fbdevclagos/developing-basic-crud-operations-with-node-express-and-mongodb-e754acb9cc15
