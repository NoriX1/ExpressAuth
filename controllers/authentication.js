const jwt = require('jwt-simple');
const User = require('../models/user');
const keys = require('../config/keys');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    // sub --> subject; iat --> issued at time
    return jwt.encode({ sub: user.id, iat: timestamp }, keys.secret);
}

exports.signup = function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).send({ error: 'You must provide all required fields!' });
    }

    User.findOne({ email: email }, (err, existingUser) => {
        if (err) { return next(err); }

        if (existingUser) {
            return res.status(422).send({ error: 'Email is in use' });
        }

        const user = new User({
            email: email,
            password: password
        });

        user.save((err) => {
            if (err) { return next(err); }
            res.json({ token: tokenForUser(user) });
        });
    });
}