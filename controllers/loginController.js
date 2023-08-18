const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc Login
// @route POST /login
// @access Private
const loginValidate = asyncHandler(async (req, res) => {
    const { userName, password } = req.body
    const user = await User.findOne({ userName }).lean().exec()
    
    // If no user 
    if (!user?._id) {
        res.status(400).json({ message: 'No user found' });
    } else {
        const { password: encryptedPassword, ...data } = user;
        if (bcrypt.compare(password, encryptedPassword)) res.status(200).json({ message: `Valid User`, ...data });
    }
    return res;
})


module.exports = {
    loginValidate
}