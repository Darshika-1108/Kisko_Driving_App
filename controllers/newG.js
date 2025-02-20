const DriveTest = require('../models/DriveTest');
const Appointment = require('../models/Appointment');

module.exports = async (req, res) => {
    try {
        // store login user's ID in session
        const userId = req.session.userId; 
        const user = await DriveTest.findById(userId);

        if (!user) {
            return res.render('g', { user: null, error: 'User not found', appointment: null });
        }

        // Check if user information is default then redirect to g2 page
        if (user.firstname === 'default' && user.lastname === 'default') {
            return res.redirect('/g2'); 
        }

        // Fetch the user's appointment details
        const appointment = await Appointment.findById(user.appointment);

         // Convert date to Date object if it's not already
         if (appointment && typeof appointment.date === 'string') {
            appointment.date = new Date(appointment.date);
        }

        res.render('g', { user , error: null, appointment });
    } catch (error) {
        console.log(error);
        res.render('g', { error: 'Error retrieving user information', user: null });
    }
}