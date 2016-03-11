var gameRoutes = function (app, Game) {

    // games
    app.get('/games', function (req, res) {
        console.log('GET /games');
        Game.find({})
            .sort({status: 'descending', name: 'ascending'})
            .populate('competitions')
            .exec()
            .then(function (docs) {
                res.send(docs);
            }, function (error) {
                console.log('Ooops: ' + error);
                res.status(500).send('Ooops: Unable to retrieve data!');
            });
    });

    app.get('/game/:id', function (req, res) {
        console.log('GET /game/' + req.params.id);
        Game.findOne({
            _id: req.params.id
        }, function (err, data) {
            res.send(data);
        });
    });

    app.get('/game/find/:sn', function (req, res) {
        console.log('GET /game/find/' + req.params.sn);
        Game.findOne({
            shortName: req.params.sn
        }, function (err, data) {
            res.send(data);
        });
    });
};

exports = module.exports = gameRoutes;