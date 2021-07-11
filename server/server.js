const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
require('./db/connect')



const login = require('./routes/login');
const update = require('./routes/update');

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;


app.use(express.static(path.join(__dirname,'public','build')))
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/login', login);
app.use('/change_name', update);


app.listen(port, () => {
  console.log(`Server run on port:${port}`)
})
