const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
// ,family history,heart disease
const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [false, 'Please enter your name'],
        maxLength: [30, 'Your name cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [false, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        required: [false, 'Please enter your password'],
        minlength: [6, 'Your password must be longer than 6 characters'],
        select: false
    },
    sex: {
        type: Number,
        required: [false, 'Please enter your gender']
    },
    age: {
        type: Number,
        required: [false, 'Please enter your age']
    },
    address: {
        type: String,
        required: [false, 'Please enter your home address'],
        unique: false,
    },
    personalNumber: {
        type: String,
        required: false,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[0-9]{11}$/.test(v);
            }, message: 'Kindly Provide valid Phone Number'
        }
    },

    workNumber: {
        type: String,
        required: false,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[0-9]{11}$/.test(v);
            }, message: 'Kindly Provide valid work Number'
        }
    },
    hospitalName: {
        type: String,
        required: [false, 'Please enter your name'],
        maxLength: [30, 'Your name cannot exceed 30 characters']
    },
    hospitalAddress: {
        type: String,
        required: [false, 'Please enter your hospital address'],
        unique: false,
    },

    avatar: {
        public_id: {
            type: String,
            required: false
        },
        url: {
            type: String,
            required: false
        }
    },
    role: {
        type: String,
        default: 'doctor'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date

})

// Encrypting password before saving user
doctorSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})

// Compare user password
doctorSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// Return JWT token
doctorSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

// Generate password reset token
doctorSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    // Set token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

    return resetToken

}

module.exports = mongoose.model('Doctor', doctorSchema);