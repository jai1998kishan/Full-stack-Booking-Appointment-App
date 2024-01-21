const path = require('path');

const cors = require('cors');

const express = require('express');
const bodyParser = require('body-parser');



const adminRoutes = require('./routes/admin');
const sequelize = require('./util/database');

const app = express();

app.use(cors());

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(adminRoutes);






sequelize.sync()
.then(result => {
    
    app.listen(4000);
})
.catch(err => {
    console.log(err);
})