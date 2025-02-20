const DriveTest = require('../models/DriveTest');

module.exports = async (req, res, next) => {
    try {
        const user = await DriveTest.findById(req.session.userId);
        const userType = req.session.userType;
        if (!user || !userType) {
            return res.redirect('/');
        }

        // Redirect to dashboard if userType is not 'Driver'
        if (userType !== 'Driver' && userType !== 'Admin') {
            return res.redirect('/');
        }
        

        // Attach userType to the request object
        req.userType = userType;

        next();
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while checking the user session');
    }
};
