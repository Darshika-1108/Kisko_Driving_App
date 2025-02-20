const DriveTest = require('../models/DriveTest');

module.exports = async (req, res) => {
    const { username, password, retypepassword, userType } = req.body;

    if (password !== retypepassword) {
        req.flash('validationErrors', ['Passwords do not match']);
        req.flash('data', req.body);
        return res.redirect('/auth/register');
    }

    try {
        const drivetests = await DriveTest.create({
            username,
            password,
            userType
        });

        console.log(drivetests)
        res.redirect('/auth/login');
    } 
    catch (error) {
        const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
        req.flash('validationErrors', validationErrors);
        req.flash('data', req.body)
        console.log(error)
        return res.redirect('/auth/register')
    }
}