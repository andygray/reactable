var tableRoutes = function (app, Competition, Pick) {

    var _ = require('lodash');

    app.get('/table/:competitionId', function (req, res) {
        console.log('GET /table/' + req.params.competitionId);

        Competition
            .findOne({'_id': req.params.competitionId})
            .lean()
            .exec()
            .then(function (comp) {

                // can do better!
                var selectionsMap = {};
                _.forEach(comp.selections, function (s) {
                    selectionsMap[s.selection] = s;
                }, selectionsMap);

                Pick
                    .find({'competition': req.params.competitionId})
                    .lean()
                    .exec()
                    .then(function (picks) {

                        picks = _.map(picks, function (p) {

                            p.selections = _.map(p.selections, function (s) {
                                //TODO do I need to convert?
                                return selectionsMap[s.toString()];
                            });

                            p.total = _.reduce(p.selections, function (sum, s) {
                                return sum + (s.score || 0) + ((s.handicap || 0) * (s.multiplier || 1));
                            }, 0);

                            delete p._id;
                            delete p.__v;

                            return p;
                        });

                        // set table on comp
                        comp.table = _.orderBy(picks, ['total', 'userName'], ['asc']);

                        res.send(comp);

                    }, function (error) {
                        console.log('Ooops: ' + error);
                        res.status(500).send('Ooops: Unable to retrieve data!');
                    });

            }, function (error) {
                console.log('Ooops: ' + error);
                res.status(500).send('Ooops: Unable to retrieve data!');
            });


    });
};

exports = module.exports = tableRoutes;