const Patient = require('../models/patient');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');

const crypto = require('crypto');
const cloudinary = require('cloudinary');

// Register a Patient   => /api/v1/patient/register
exports.registerPatient = catchAsyncErrors(async (req, res, next) => {

    // const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //     folder: 'Inam',
    //     width: 150,
    //     crop: "scale"
    // })

    const {
        name,
        age,
        weight,
        personalNumber,
        emergencyNumber,
        smoker,
        familyHistory,
        heartDisease,
        email,
        password
    } = req.body;

    const patient = await Patient.create({
        name,
        age,
        weight,
        personalNumber,
        emergencyNumber,
        smoker,
        familyHistory,
        heartDisease,
        email,
        password,
        // avatar: {
        //     public_id: result.public_id,
        //     url: result.secure_url
        // }
    })

    sendToken(patient, 200, res)

})
// Get all users   =>   /api/v1/admin/patients
exports.allPatients = catchAsyncErrors(async (req, res, next) => {
    const patients = await Patient.find();

    res.status(200).json({
        success: true,
        patients
    })
})