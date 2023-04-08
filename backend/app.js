// adding tensorFlow
const tf = require('@tensorflow/tfjs');

const express = require('express')
const app = express()
const errorMiddleware = require('./middlewares/erros')
app.use(express.json());

// Define the model architecture
const model = tf.sequential();
model.add(tf.layers.dense({ units: 10, inputShape: [4], activation: 'relu' }));
model.add(tf.layers.dense({ units: 10, activation: 'relu' }));
model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy' });

//Import all routes
const predict = require('./routes/bpmRoute')
const auth = require('./routes/authRoute');
const patient = require('./routes/patientRoute');


// app.use('/api/v1', auth)
app.use('/api/v1', patient)
// app.use('/api/v1', predict);

//Middle to handle error
app.use(errorMiddleware);
module.exports = app