var userRoutes = function (app, User) {

    var crypto = require('crypto');
    var appSecret = 'hydrocortisone181273';

    app.get('/users', function (req, res) {
        console.log('GET /users');
        User.find({}, 'name email admin')
            .sort({name: 'ascending'})
            .exec()
            .then(function (docs) {
                res.send(docs);
            }, function (error) {
                console.log('Ooops: ' + error);
                res.status(500).send('Ooops: Unable to retrieve data!');
            });
    });

    app.put('/auth/user/favs/pull/:userId', function (req, res) {
        console.log('PUT /user/favs/pull/' + req.params.userId);

        User.findByIdAndUpdate(req.user._id,
            {$pull: {'favs': req.params.userId}},
            {new: true},
            function (err, user) {
                console.log(err);
                console.log(user);
            });

        res.send('OK');
    });

    app.put('/auth/user/favs/push/:userId', function (req, res) {
        console.log('PUT /user/favs/push/' + req.params.userId);

        User.findByIdAndUpdate(req.user._id,
            {$push: {'favs': req.params.userId}},
            {new: true},
            function (err, user) {
                console.log(err);
                console.log(user);
            });

        res.send('OK');
    });

    app.get('/auth/user/favs', function (req, res) {
        console.log('GET /user/favs' + req.user._id);

        return User.findById(
            req.user._id,
            {favs: 1},
            function (err, favs) {
                if (err) {
                    res.send(401, 'fav error');
                    return;
                }

                res.send(favs);
            });
    });

    app.post('/register', function (req, res) {
        console.log('POST /register' + req.body.name);

        var hash = crypto
            .createHash('md5', appSecret)
            .update(req.body.password)
            .digest('hex');

        User.create({
                name: req.body.name,
                email: req.body.email,
                password: hash
            },
            function (err, user) {
                if (err) {
                    console.log('Ooops: ' + error);
                    res.status(500).send('Ooops: Unable to register!');
                    return;
                }
                console.log('User registered: ' + req.body.name);
                return res.send(user);
            });
    });

    //app.put('/auth/reset/:userId', function (req, res) {
    //    console.log('PUT /auth/reset/' + req.params.userId);
    //
    //    var hash = crypto
    //        .createHash('md5', appSecret)
    //        .update(req.body.password)
    //        .digest('hex');
    //
    //    User.findByIdAndUpdate(req.user._id,
    //        {password: hash},
    //        {new: true},
    //        function (err, user) {
    //            console.log(err);
    //            console.log(user);
    //        });
    //
    //    res.send('OK');
    //});
};

exports = module.exports = userRoutes;