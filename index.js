const express = require('express');
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
const DriveTest = require('./models/DriveTest');
const expressSession = require('express-session');
const flash = require('connect-flash');

const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');

const homeController = require('./controllers/home');
const newAppointmentController = require('./controllers/newAppointments');
const storeAppointmentController = require('./controllers/storeAppointment');

const newGController = require('./controllers/newG');
const updateGController = require('./controllers/updateG');
const newG2Controller = require('./controllers/newG2');
const storeG2Controller = require('./controllers/storeG2');
const fetchAppointmentsController = require('./controllers/fetchAppointments');

const app = express();
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(expressSession({
    secret: 'Darshika Patel',
    resave: false,
    saveUninitialized: false
}));

// Global Variable
global.loggedIn = null;

app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    userType = req.session.userType;
    next();
});

const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticateMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');
const logoutController = require('./controllers/logout');
const validationMiddleware = require('./middleware/validation');

mongoose.connect('mongodb+srv://admin:admin@cluster0.6al4qte.mongodb.net/drivetestapp?retryWrites=true&w=majority&appName=Cluster0');

app.listen(5000, () => {
    console.log('App is listening at the port 5000');
});


// Display All Records
app.get('/', homeController);

// Routes for Register Page
app.get('/auth/register', redirectIfAuthenticateMiddleware, newUserController);
app.post('/users/register', redirectIfAuthenticateMiddleware, storeUserController);

// Routes for Login Page
app.get('/auth/login', redirectIfAuthenticateMiddleware, loginController);
app.post('/users/login', redirectIfAuthenticateMiddleware, loginUserController);

// Routes for G Page
app.get('/g', authMiddleware, newGController);

// Routes for G2 Page
app.get('/g2', authMiddleware, newG2Controller);
 

// Fetch available appointments for a specific date
app.get('/g2/appointments', authMiddleware, fetchAppointmentsController);
// Store G2 Data in Database
app.post('/add_data', authMiddleware, validationMiddleware, storeG2Controller);

// Update Car Information
app.post('/update_car_data', authMiddleware, updateGController);

app.get('/appointment', authMiddleware, newAppointmentController);
app.post('/appointment', authMiddleware, storeAppointmentController);


// Route for Logout
app.get('/auth/logout', logoutController);

app.use((req, res) => res.render('notFound'));
