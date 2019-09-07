const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });   //Auth for requests with token
const requireSignin = passport.authenticate('local', { session: false });   //Signing in via login and password

module.exports = function (app) {
    app.get('/', requireAuth, function (req, res) {
        res.send({ secret: 'data' });
    })
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);
}