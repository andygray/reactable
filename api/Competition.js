var competitionRoutes = function (app, Competition) {

    var _ = require('lodash');

    app.get('/competition/:competitionId', function (req, res) {
        console.log('GET /competition/' + req.params.competitionId);

        Competition
            .findOne({'_id': req.params.competitionId})
            .exec()
            .then(function (comp) {

                res.send(comp);

            }, function (error) {
                console.log('Ooops: ' + error);
                res.status(500).send('Ooops: Unable to retrieve data!');
            });

    });
};

exports = module.exports = competitionRoutes;