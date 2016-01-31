var pickRoutes = function (app, Pick) {

    var _ = require('lodash');

    app.get('/picks/:competitionId', function (req, res) {
        console.log('GET /competition/' + req.params.competitionId);

        Pick
            .find({'competition': req.params.competitionId})
            .populate('user')
            .exec()
            .then(function (picks) {

                res.send(picks);

            }, function (error) {
                console.log('Ooops: ' + error);
                res.status(500).send('Ooops: Unable to retrieve data!');
            });

    });
};

exports = module.exports = pickRoutes;