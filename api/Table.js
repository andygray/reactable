var tableRoutes = function (app, Competition, Pick) {

    var _ = require('lodash');

    app.get('/table/:competitionId', function (req, res) {
        console.log('GET /table/' + req.params.competitionId);

        Competition
            .findOne({_id: req.params.competitionId})
            .exec()
            .then(function (comp) {
                var tempTable = _.map(comp.selections, function (selection) {
                    return {
                        player: selection.selection,
                        score: selection.score
                    };
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
            .findByIdAndUpdate(req.params.competitionId,
            {$push: {'selections': {selection: req.body.selectionId, score: 99}}})
            .exec()
            .then(function (game) {
                console.log(game);

                res.send(game);
            }, function (error) {
                console.log('Ooops: ' + error);
                res.status(500).send('Ooops: Unable to retrieve data!');
            });
    });
};

exports = module.exports = tableRoutes;