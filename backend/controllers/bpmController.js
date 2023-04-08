// const Product = require('../models/product')

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures')




// Get single product details   =>   /api/v1/product/:id
exports.getPredict = catchAsyncErrors(async (req, res, next) => {
    // const bpmValueReciving = req.params.id;
    // console.log(`the bpm value is `, bpmValueReciving);
    const { bp, bpm, age, gender } = req.query;
    const input = tf.tensor2d([[bp, bpm, age, gender]]);
    const output = model.predict(input).dataSync()[0];
    const isHeartAttack = output >= 0.5 ? 'likely' : 'unlikely';
    res.json({
        prediction: isHeartAttack,
        probability: output
    });


})

