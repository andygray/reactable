var selectionRoutes = function (app, Selection) {

    app.get('/selections', function(req, res) {
        console.log('GET /selections');
        Selection.find({})
            .sort({name: 'ascending'})
            .exec()
            .then(function(data) {
                res.send(data);
            }, function (error) {
                console.log('Ooops: ' + error);
                res.status(500).send('Ooops: Unable to retrieve data!');
            })
    });
};

exports = module.exports = selectionRoutes;