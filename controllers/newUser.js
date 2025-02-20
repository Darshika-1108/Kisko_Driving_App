module.exports = (req, res) => {

    var username = ""
    var password = ""
    var userType = ""
    const data = req.flash('data')[0] || {};

    if(typeof data != "undefined") {
        username = data.username
        password = data.password 
        userType = data.userType
    }

    // define errors as an array
    const errors = req.flash('validationErrors') || [];

    res.render('registerLogin', {
        registerErrors: errors,
        loginErrors: [],
        username: username,
        password: password,
        userType: userType
    })
}