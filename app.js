const bodyParser = require("body-parser");
const express = require("express");
const uuid = require('uuid')
const session = require('express-session')
// const FileStore = require('session-file-store')(session);
const mongoose = require("mongoose");
const hbs = require('hbs');
const hbsutils = require('hbs-utils')(hbs);
const fileUpload = require('express-fileupload');
const path = require('path');

// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;

// const cookieParser = require('cookie-parser');
// const MongoStore = require('connect-mongo')(session);



global.appRoot = path.resolve(__dirname);

hbs.registerPartials(__dirname + '/views/partials');
hbsutils.registerWatchedPartials(__dirname + '/views/partials');

const app = express();
app.set('env', 'production');

const users = [{
    id: '1',
    email: 'admin',
    password: 'cZpM9ue1s0'
}];

// passport.use(new LocalStrategy({
//         usernameField: 'email',
//         passwordField: 'password'
//     },
//     (email, password, done) => {
//         const user = users[0]
//         if (email === user.email && password === user.password) {
//             return done(null, user)
//         }
//     }
// ));
// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });
// passport.deserializeUser((id, done) => {
//     const user = users[0].id === id ? users[0] : false;
//     done(null, user);
// });

// app.use(cookieParser());

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.use(fileUpload());

// mongoose.connect('mongodb://localhost:27017/fashionbutik', {
//     // useMongoClient: true,
//     useNewUrlParser: true
// });
// mongoose.Promise = global.Promise;
// const db = mongoose.connection
app.use(session({
    genid: (req) => {
        return uuid()
    },
    // store: new MongoStore({
    //     mongooseConnection: db
    // }),
    secret: 'kUbRQNNXKJvqK',
    resave: false,
    saveUninitialized: true
}));
// app.use(passport.initialize());
// app.use(passport.session());

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

const homeRouter = require("./routes/homeRouter.js");
const contentRouter = require("./routes/contentRouter.js");
const productRouter = require("./routes/productRouter.js");
app.use("/", homeRouter);
app.use("/admin/content", contentRouter);
app.use("/admin/product", productRouter);
// app.get('/logout', function(req, res) {
//     req.logout();
//     res.redirect('/');
// });
app.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
});

// app.post('/authenticate', passport.authenticate('local', {
//     successRedirect: '/admin/product',
//     failureRedirect: '/login',
//     // failureFlash: true
// }));

// app.post('/authenticate', (req, res, next) => {
//     passport.authenticate('local', (err, user, info) => {
//         // if (user) return console.log(user);
//         // if (info) return console.log(info);
//         // if (err) return console.log(err);
//         req.login(user, (err) => {
//             // if (err) return console.log(err);
//             res.redirect('/admin/product');
//         })
//     })(req, res, next);
// })

app.post('/authenticate', function(request, response) {
    if (request.session.loggedin) response.redirect('/admin/product');
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		if (username === users[0].email && password === users[0].password) {
			request.session.loggedin = true;
			request.session.username = username;
			response.redirect('/admin/product');
		}
	};
	response.redirect('/login');
});

app.use(function(req, res, next) {
    res.status(404).send("Not Found")
});

mongoose.connect("mongodb://localhost:27017/fashionbutik", {
    useNewUrlParser: true
}, function(err) {
    console.log('connected mongo')
    if (err) return console.log(err);
    app.listen(80);
});
