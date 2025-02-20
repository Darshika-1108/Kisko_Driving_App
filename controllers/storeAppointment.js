const Appointment = require('../models/Appointment');

module.exports = async (req, res) => {
    const { date, selectedTime } = req.body;

    if (!date || !selectedTime) {
        req.flash('appointmentErrors', ['Date and time are required.']);
        req.flash('data', req.body);
        return res.redirect('/appointment');
    }

    try {
        // Check if the appointment slot already exists
        const existingAppointment = await Appointment.findOne({ date, time: selectedTime });
        if (existingAppointment) {
            req.flash('appointmentErrors', ['This time slot has already been added for the selected date.']);
            req.flash('data', req.body);
            return res.redirect('/appointment');
        }

        const appointment = await Appointment.create({
            date,
            time: selectedTime,
            isTimeSlotAvailable: true
        });

        console.log(appointment);
        res.redirect('/appointment');
    } 
    catch (error) {
        let validationErrors = [];

        if (error.errors) {
            validationErrors = Object.keys(error.errors).map(key => error.errors[key].message);
        } else if (error.message) {
            validationErrors.push(error.message);
        } else {
            validationErrors.push('An unknown error occurred.');
        }
        req.flash('appointmentErrors', validationErrors);
        req.flash('data', req.body);
        console.log(error);
        return res.redirect('/appointment');
    }
};
