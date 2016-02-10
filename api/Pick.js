var pickRoutes = function (app, Pick) {

    var _ = require('lodash');

    app.get('/picks/:competitionId', function (req, res) {
        console.log('GET /competition/' + req.params.competitionId);

        Pick
            .find({'competition': req.params.competitionId})
            .exec()
            .then(function (picks) {
                res.send(picks);
            }, function (error) {
                console.log('Ooops: ' + error);
                res.status(500).send('Ooops: Unable to retrieve data!');
            });
    });

    app.post('/auth/picks', function (req, res) {
        console.log('POST /auth/picks ' + ' BODY: ' + JSON.stringify(req.body));

        //TODO check user of auth is same user in body

        if (req.body._id) {
            //TODO why isnt upsert working????
            Pick.findByIdAndUpdate(req.body._id, req.body, {upsert: true, new: true},
                function (error, picks) {
                    if (error) {
                        console.log('Ooops: ' + error);
                        res.status(500).send('Ooops: Unable to update picks!');
                        return;
                    }

                    res.send(picks);
                });
        }
        else {
            Pick.create(req.body, function (error, picks) {
                if (error) {
                    console.log('Ooops: ' + error);
                    res.status(500).send('Ooops: Unable to add picks!');
                    return;
                }

                res.send(picks);
            });
        }
    });
};

exports = module.exports = pickRoutes;