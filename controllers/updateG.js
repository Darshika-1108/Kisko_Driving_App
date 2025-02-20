const Appointment = require('../models/Appointment');
const DriveTest = require('../models/DriveTest');

// Update Car Information
module.exports = async (req, res) => {
    const { licenseno, make, model, year, platno } = req.body;


    try {
        const user = await DriveTest.findOneAndUpdate(
            { licenseno },
            {
                car_details: {
                    make,
                    model,
                    year,
                    platno
                }
            },
            { new: true }
        );

        // Fetch the user's appointment details
        const appointment = await Appointment.findById(user.appointment);

         // Convert date to Date object if it's not already
         if (appointment && typeof appointment.date === 'string') {
            appointment.date = new Date(appointment.date);
        }

        if (!user) {
            return res.render('g', { user: null, appointment : null, error: 'No User Found' });
        }

        res.render('g', { user, appointment, error: null });
    } catch (error) {
        console.log(error);
        res.render('g', { error: 'Error updating car information', user: null });
    }
};