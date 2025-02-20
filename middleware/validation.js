
module.exports = (req, res, next) => {
    const { firstname, lastname, licenseno, age, dob, car_details, date, appointmentId } = req.body;
    const errors = []; // Array to store error messages

    // Validation for each field
    if (!firstname || firstname.trim().length === 0) {
        errors.push('First name is required.');
    }
    if (!lastname || lastname.trim().length === 0) {
        errors.push('Last name is required.');
    }

    if (!licenseno) {
        errors.push('License number is required.');
    }
    else if (!/^[a-zA-Z0-9]+$/.test(licenseno)) {
        errors.push('License number must be alphanumeric.');
    } 
    else if (!/[a-zA-Z]/.test(licenseno)) {
        errors.push('License number must contain at least one letter.');
    } 
    else if (!/\d/.test(licenseno)) {
        errors.push('License number must contain at least one number.');
    }
    else if (licenseno.trim().length !== 8) {
        errors.push('License number must be exactly 8 characters long and alphanumeric.');
    }

    if (isNaN(age) || age < 18 || age > 120) {
        errors.push('Age must be a number and should be between 18 and 120.');
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
        errors.push('Date of birth should be in YYYY-MM-DD format.');
    }
    if (!car_details || !car_details.make || car_details.make.trim().length === 0) {
        errors.push('Car make is required.');
    }
    if (!car_details || !car_details.model || car_details.model.trim().length === 0) {
        errors.push('Car model is required.');
    }
    if (isNaN(car_details.year) || car_details.year < 1900 || car_details.year > 2024) {
        errors.push('Car year must be between 1900 and 2024.');
    }
    if (!car_details || !car_details.platno || car_details.platno.trim().length === 0) {
        errors.push('Plate number is required.');
    }

    // Validate date
    if (!date || date.trim().length === 0) {
        errors.push('Date is required.');
    }

    // Validate for time selection
    if (!appointmentId || appointmentId.trim().length === 0) {
        errors.push('Time slot is required.');
    }

    // If errors exist, store them in flash and redirect to the form
    if (errors.length > 0) {
        req.flash('G2validationErrors', errors);
        req.flash('G2data', req.body);
        return res.redirect('/g2');
    }

    next();
};
