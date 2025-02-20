const DriveTest = require('../models/DriveTest');
const Appointment = require('../models/Appointment');

module.exports = async (req, res) => {
    try {
        const user = await DriveTest.findById(req.session.userId);

        if (user && user.licenseno === 'default') {
            // Retrieve data from flash messages
            const data = req.flash('G2data')[0] || {};

            // Retrieve validation errors from flash messages
            const errors = req.flash('G2validationErrors');

             // Fetch appointments for the selected date
             const appointments = await Appointment.find({ 
                date: req.query.date ? new Date(req.query.date) : new Date(),
                isTimeSlotAvailable: true
            });


            res.render('g2', {
                error: null,
                user: user,
                errors: errors || [], 
                firstname: data.firstname || 'default',
                lastname: data.lastname || 'default',
                licenseno: data.licenseno || 'default',
                age: data.age || 'default',
                dob: data.dob || 'default',
                car_details: data.car_details || {
                    make: 'default',
                    model: 'default',
                    year: 'default',
                    platno: 'default'
                },
                appointments: appointments
            });
        } else {
            res.redirect('/g');
        }
    } catch (error) {
        console.log(error);
        res.redirect('/g');
    }
};
