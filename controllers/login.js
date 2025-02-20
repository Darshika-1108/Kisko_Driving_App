module.exports = (req, res) => {
    var username = ""
    var password = ""
    
    // Get flash error data for login form
    const loginData = req.flash('loginData')[0] || {};
    
    if(typeof loginData != "undefined") {
        username = loginData.username || "";
        password = loginData.password || "";
    }

    // Errors defined as an array
    const loginErrors = req.flash('loginErrors') || [];

    // Render the template with login errors and form data
    res.render('registerLogin', {
        loginErrors: loginErrors,
        registerErrors: [],
        username: username,
        password: password
    });
};
