module.exports = async (req, res) => {
    try {
        if (req.userType === 'Admin') {

            const data = req.flash('data')[0] || {};

            // define errors as an array
            const errors = req.flash('appointmentErrors') || [];

            return res.render('appointment', {
                appointmentErrors: errors,
                date: data.date || '',
                selectedTime: data.selectedTime || ''
            });
        }
        return res.redirect('/');
    } catch (error) {
        console.log(error);
    }
};