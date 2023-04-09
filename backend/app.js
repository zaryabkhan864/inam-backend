// // adding tensorFlow
// const tf = require('@tensorflow/tfjs');


const tf = require('@tensorflow/tfjs-node');
const XLSX = require('xlsx');

const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');

const workbook = XLSX.readFile(path.join(__dirname, '../backend/dataset/heart.xlsx'));
const worksheet = workbook.Sheets['Sheet1'];
const data = XLSX.utils.sheet_to_json(worksheet);

// Split the data into training and testing sets
const splitIndex = Math.round(data.length * 0.8);
const trainingData = data.slice(0, splitIndex);
const testingData = data.slice(splitIndex);

// Define the model architecture
const model = tf.sequential();
model.add(tf.layers.dense({ inputShape: [5], units: 16, activation: 'relu' }));
model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });

// Convert the training data to tensors
const trainingInputs = tf.tensor(trainingData.map(d => [d.age, d.gender === 'male' ? 0 : 1, d.weight, d.bloodPressure, d.heartRate]));
const trainingLabels = tf.tensor(trainingData.map(d => d.heartAttack));

// Train the model
model.fit(trainingInputs, trainingLabels, { epochs: 50 }).then(() => {
    console.log('Model trained');
});

const app = express()
const errorMiddleware = require('./middlewares/erros')
app.use(express.json());
app.use(bodyParser.json());

// // Define the model architecture
// const model = tf.sequential();
// model.add(tf.layers.dense({ units: 10, inputShape: [4], activation: 'relu' }));
// model.add(tf.layers.dense({ units: 10, activation: 'relu' }));
// model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
// model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy' });

// // load the pre-trained weights
// (async function () {
//     await model.load('../backend/dataset/heart.xlsx')
//     console.log('Model loaded 1')
// })();

//Import all routes
const predict = require('./routes/bpmRoute')
const auth = require('./routes/authRoute');
const patient = require('./routes/patientRoute');


app.use('/api/v1', auth)
app.use('/api/v1', patient)
app.use('/api/v1', predict);

//Middle to handle error
app.use(errorMiddleware);
module.exports = app