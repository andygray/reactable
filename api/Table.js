var tableRoutes = function (app, Competition, Pick) {

    var _ = require('lodash');

    var cachedTable = undefined;
    var cachedTableTimestamp = undefined;

    var tiedCalc = function (table) {
        if (table && table.length > 0) {
            var pos = 1;
            table[0].position = 1;
            if (table[1] && table[0].total === table[1].total) {
                table[0].tied = true;
            }

            for (var i = 1; i < table.length; i++) {
                var prev = i - 1;
                var next = i + 1;
                if (table[i].total !== table[prev].total) {
                    pos = i + 1;
                }
                else {
                    table[i].tied = true;
                }

                if (table[next] && table[i].total === table[next].total) {
                    table[i].tied = true;
                }

                table[i].position = pos;
            }
        }
    };

    app.get('/table/:competitionId', function (req, res) {
        console.log('GET /table/' + req.params.competitionId);

        Competition
            .findOne({'_id': req.params.competitionId})
            .lean()
            .exec()
            .then(function (comp) {

                // check something has changed; if not return cached
                if (cachedTable && cachedTableTimestamp && cachedTableTimestamp === comp.updated) {
                    comp.table = cachedTable;
                    res.send(comp);
                    return;
                }

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

                        var newPicks = _.map(picks, function (p) {

                            p.selections = _.map(p.selections, function (s) {
                                //TODO do I need to convert?
                                return selectionsMap[s.toString()];
                            });

                            p.total = _.reduce(p.selections, function (sum, s) {
                                return sum + (s.score || 0) + ((s.handicap || 0) * (s.multiplier || 1));
                            }, 0);

                            return p;
                        });

                        // set table on comp
                        comp.table = _.orderBy(newPicks, ['total', 'userName'], ['asc']);

                        // tied position calculations
                        tiedCalc(comp.table);

                        if (cachedTable) {
                            // difference
                            _.forEach(comp.table, function (row, index) {
                                var cachedIndex = _.findIndex(cachedTable, function (cachedRow) {
                                    return cachedRow.user.id === row.user.id;
                                });


                                row.difference = (cachedIndex !== -1) ? cachedIndex - index : 0;
                            })
                        }

                        cachedTable = comp.table;
                        cachedTableTimestamp = comp.updated;

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