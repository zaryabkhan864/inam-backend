const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures')
const tf = require('@tensorflow/tfjs-node');
const XLSX = require('xlsx');
const bodyParser = require('body-parser');
const path = require('path');

const workbook = XLSX.readFile(path.join(__dirname, '../dataset/heart.xlsx'));
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


// Get single product details   =>   /api/v1/product/:id
exports.getPredict = catchAsyncErrors(async (req, res, next) => {
    const { age, sex, weight, BP, HR } = req.body;
    const input = tf.tensor([[age, sex === 'male' ? 0 : 1, weight, BP, HR]]);
    const prediction = model.predict(input).dataSync()[0];
    res.json({ prediction });

})

