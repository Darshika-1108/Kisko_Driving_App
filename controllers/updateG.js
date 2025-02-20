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

        if (!user) {
            return res.render('g', { user: null, error: 'No User Found' });
        }

        res.render('g', { user, error: null });
    } catch (error) {
        console.log(error);
        res.render('g', { error: 'Error updating car information', user: null });
    }
};