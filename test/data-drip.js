var restler = require('restler');
var _ = require('lodash');
var repeat = require('repeat');

var selections = [
    {
        'selection' : '551d378ab6064a4f46f9fcfe',
        'selectionName' : 'Freddie Jacobson'
    },
    {
        'selection' : '551d378ab6064a4f46f9fcff',
        'selectionName' : 'Paul Casey'
    },
    {
        'selection' : '551d378ab6064a4f46f9fd15',
        'selectionName' : 'Phil Mickelson'
    },
    {
        'selection' : '551d378ab6064a4f46f9fd16',
        'selectionName' : 'Charley Hoffman'
    },
    {
        'selection' : '551d378ab6064a4f46f9fcf8',
        'selectionName' : 'Charlie Beljan'
    },
    {
        'selection' : '551d378ab6064a4f46f9fcf9',
        'selectionName' : 'Aaron Baddeley'
    },
    {
        'selection' : '551d378ab6064a4f46f9fcfa',
        'selectionName' : 'Danny Lee'
    }
];

var dripper = function () {
    var sel = selections[Math.floor((Math.random() * 6) + 1)];
    var score = Math.floor((Math.random() * 12)) - 10;
    console.log(sel.selectionName + ' >> ' + score);

    restler.putJson('http://localhost:8080/table/push/56a52965d4c622243710639e', {
        'selectionId': sel.selection,
        'score': score
    }).on('complete', function (data) {
        console.log(data);
    });
};

repeat(dripper).every(5, 'sec')
    .for(60, 'min')
    .start.now()
    .then(function () {
        console.log('Completed');
        process.exit(code = 0);
    });