const DriveTest = require('../models/DriveTest');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    try {
        const { username, password } = req.body;

        const errors = [];
        if (!username || !password) {
            errors.push('Username and password are required.');
        }

        if (errors.length > 0) {
            req.flash('loginErrors', errors);
            req.flash('loginData', req.body);
            return res.redirect('/auth/login');
        }

        const user = await DriveTest.findOne({ username });

        if (user) {
            const same = await bcrypt.compare(password, user.password);

            if (same) { 
                req.session.userId = user._id;
                req.session.userType = user.userType;
                // Check if user login for first time
                if(user.userType === 'Admin') {
                    res.redirect('/');
                }
                else if (user.firstname === 'default' && user.lastname === 'default') {
                    res.redirect('/g2');
                } else {
                    res.redirect('/g');
                }
            } else {
                req.flash('loginErrors', ['Incorrect password. Please try again or sign up.']);
                req.flash('loginData', req.body);
                res.redirect('/auth/login');
            }
        } else {
            req.flash('loginErrors', ['User not found. Please sign up.']);
            req.flash('loginData', req.body);
            res.redirect('/auth/login');
        }
    } catch (error) {
        req.flash('loginErrors', ['An error occurred. Please try again.']);
        req.flash('loginData', req.body);
        console.log(error);
        res.redirect('/auth/login');
    }
};
