var tableRoutes = function (app, Competition, Pick) {

    var _ = require('lodash');

    app.get('/table/:competitionId', function (req, res) {
        console.log('GET /table/' + req.params.competitionId);

        res.setHeader('Content-Type', 'application/json');

        Competition
            .findOne({'_id': req.params.competitionId})
            .exec()
            .then(function (comp) {

                Pick
                    .find({'competition': req.params.competitionId})
                    .lean()
                    .exec()
                    .then(function (picks) {

                        // can do better!
                        var selectionsMap = {};
                        _.forEach(comp.selections, function (s) {
                            selectionsMap[s.selection] = s;
                        }, selectionsMap);

                        picks = _.map(picks, function (p) {
                            p.selections = _.map(p.selections, function (s) {
                                return selectionsMap[s.selection];
                            });

                            p.total = _.reduce(p.selections, function (sum, s) {
                                return sum + (s.score || 0) + ((s.handicap || 0) * (s.multiplier || 1));
                            }, 0);

                            return p;

                        });

                        //console.log(picks);
                        res.send(_.orderBy(picks, ['total', 'userName'], ['asc']));

                    }, function (error) {
                        console.log('Ooops: ' + error);
                        res.status(500).send('Ooops: Unable to retrieve data!');
                    });

            }, function (error) {
                console.log('Ooops: ' + error);
                res.status(500).send('Ooops: Unable to retrieve data!');
            });


    });

    app.put('/table/push/:competitionId', function (req, res) {
        console.log('PUT /table/push/' + req.params.competitionId + ' BODY: ' + JSON.stringify(req.body));

        Competition
            .findOne(req.params.competitionId)
            .update({'selections.selection': req.body.selectionId}, {
                updated: Number((new Date().getTime() / 1000).toFixed(0)),
                $set: {
                    'selections.$.score': req.body.score
                }
            })
            .exec()
            .then(function (game) {
                res.send(game);
            }, function (error) {
                console.log('Ooops: ' + error);
                res.status(500).send('Ooops: Unable to retrieve data!');
            });
    });
};

exports = module.exports = tableRoutes;