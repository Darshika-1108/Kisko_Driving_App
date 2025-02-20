const Appointment = require('../models/Appointment');

module.exports = async (req, res) => {
    const { date } = req.query;
    try {
        const appointments = await Appointment.find({ date, isTimeSlotAvailable: true });
        res.json({ appointments });
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
