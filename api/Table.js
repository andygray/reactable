var tableRoutes = function (app, Competition) {

    var _ = require('lodash');

    app.get('/table/:competitionId', function (req, res) {
        console.log('GET /table/' + req.params.competitionId);

        Competition
            .findOne({_id: req.params.competitionId})
            .exec()
            .then(function (comp) {
                var tempTable =  _.map(comp.selections, function (selection) {
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
};

exports = module.exports = tableRoutes;