// const Product = require('../models/product')

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures')




// Get single product details   =>   /api/v1/product/:id
exports.getPredict = catchAsyncErrors(async (req, res, next) => {
    // const bpmValueReciving = req.params.id;
    // console.log(`the bpm value is `, bpmValueReciving);
    // await model.load('../dataset/heart.xlsx')
    // console.log('Model loaded 2')

    // const { BP, HR, age, sex } = req.query;
    // const input = tf.tensor2d([[BP, HR, age, sex]]);
    // const output = model.predict(input).dataSync()[0];
    // const isHeartAttack = output >= 0.5 ? 'likely' : 'unlikely';
    // res.json({
    //     prediction: isHeartAttack,
    //     probability: output
    // });
    const { age, sex, weight, BP, HR } = req.body;
    const input = tf.tensor([[age, sex === 'male' ? 0 : 1, weight, BP, HR]]);
    const prediction = model.predict(input).dataSync()[0];
    res.json({ prediction });

})

