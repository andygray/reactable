var tableRoutes = function (app, Competition, Pick) {

    var _ = require('lodash');

    app.get('/table/:competitionId', function (req, res) {
        console.log('GET /table/' + req.params.competitionId);

        var self = this;
        Pick
            .find({'competition': req.params.competitionId})
            .populate('user')
            .exec()
            .then(function (picks) {

                self.allPicks = picks;

            }, function (error) {
                console.log('Ooops: ' + error);
                res.status(500).send('Ooops: Unable to retrieve data!');
            });

        Competition
            .findOne({'_id': req.params.competitionId})
            .exec()
            .then(function (comp) {
                var tempTable = _.map(comp.selections, function (selection) {
                    return {
                        player: selection.selection,
                        score: selection.score
                    };
                });

                // adjust values randomly
                tempTable = _.map(tempTable, function (row) {
                    var x = Math.floor((Math.random() * 10) + 1);
                    if (x < 3) {
                        row.score = row.score + 1;
                    }
                    if (x > 3 && x < 7) {
                        row.score = row.score - 1;
                    }

                    return row;
                });

                res.send(_.orderBy(tempTable, ['score'], ['asc']));

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