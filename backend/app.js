const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const errorMiddleware = require('./middlewares/erros')
app.use(express.json());
app.use(bodyParser.json());

//Import all routes
const predict = require('./routes/bpmRoute')
const auth = require('./routes/authRoute');
const patient = require('./routes/patientRoute');
const doctor = require('./routes/doctorRoute');


app.use('/api/v1', auth)
app.use('/api/v1', patient)
app.use('/api/v1', doctor)
app.use('/api/v1', predict);

//Middle to handle error
app.use(errorMiddleware);
module.exports = app