const DriveTest = require('../models/DriveTest');
const Appointment = require('../models/Appointment');

// Store Data
module.exports = async (req, res) => {
    const { firstname, lastname, licenseno, age, dob, car_details, appointmentId } = req.body;

    try {

        //Check if licenseno is already exists
        const existinglicenseno = await DriveTest.findOne({ licenseno });
        if (existinglicenseno) {
            req.flash('G2validationErrors', ['License Number already exists']);
            req.flash('G2data', req.body);
            return res.redirect('/g2');
        }

        // Check if the appointment slot is available
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment || !appointment.isTimeSlotAvailable) {
            req.flash('G2validationErrors', ['Selected time slot is no longer available']);
            req.flash('G2data', req.body);
            return res.redirect('/g2');
        }
       
        // Update the appointment as booked
        appointment.isTimeSlotAvailable = false;
        await appointment.save();

        // Update user data
        const drivetest = await DriveTest.findByIdAndUpdate(
            req.session.userId,
            {
                firstname,
                lastname,
                licenseno,
                age,
                dob,
                car_details: {
                    make: car_details.make,
                    model: car_details.model,
                    year: car_details.year,
                    platno: car_details.platno
                },
                appointment: appointment._id
            },
            { new: true }
        );

        console.log(drivetest);
        res.redirect("/g");
    } catch (error) {
        const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message);
        req.flash('G2validationErrors', validationErrors);
        req.flash('G2data', req.body);
        console.log(error);
        res.redirect('/g2');
    }
};
