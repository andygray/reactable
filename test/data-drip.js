var restler = require('restler');
var _ = require('lodash');
var repeat = require('repeat');

var selections = [
    {
      "selection": "551d378ab6064a4f46f9fd0d",
      "selectionName": "Jordan Spieth",
      "score": 0,
      "potIndex": 0
    },
    {
      "selection": "551d378ab6064a4f46f9fd13",
      "selectionName": "Patrick Reed",
      "score": 0,
      "potIndex": 0
    },
    {
      "selection": "551d378ab6064a4f46f9fd03",
      "selectionName": "Justin Thomas",
      "score": 0,
      "potIndex": 0
    },
    {
      "selection": "552003f896e611778ab7d89f",
      "selectionName": "Kevin Na",
      "score": 0,
      "potIndex": 0
    },
    {
      "selection": "551d378ab6064a4f46f9fd52",
      "selectionName": "Matt Kuchar",
      "score": 0,
      "potIndex": 0
    },
    {
      "selection": "551d378ab6064a4f46f9fd5a",
      "selectionName": "Martin Kaymer",
      "score": 0,
      "potIndex": 1
    },
    {
      "selection": "552003fc96e611778ab7d8bd",
      "selectionName": "Graeme McDowell",
      "score": 0,
      "potIndex": 1
    },
    {
      "selection": "551d378ab6064a4f46f9fcfd",
      "selectionName": "Danny Willett",
      "score": 0,
      "potIndex": 1
    },
    {
      "selection": "552003f896e611778ab7d89c",
      "selectionName": "Henrik Stenson",
      "score": 0,
      "potIndex": 1
    },
    {
      "selection": "552003fb96e611778ab7d8b5",
      "selectionName": "Ian Poulter",
      "score": 0,
      "potIndex": 1
    },
    {
      "selection": "5521ba71bcfae4de67b07e59",
      "selectionName": "Camilo Villegas",
      "score": 0,
      "potIndex": 2
    },
    {
      "selection": "551d378ab6064a4f46f9fcfa",
      "selectionName": "Danny Lee",
      "score": 0,
      "potIndex": 2
    },
    {
      "selection": "552003fb96e611778ab7d8ba",
      "selectionName": "Branden Grace",
      "score": 0,
      "potIndex": 2
    },
    {
      "selection": "551d378ab6064a4f46f9fd12",
      "selectionName": "Charl Schwartzel",
      "score": 0,
      "potIndex": 2
    },
    {
      "selection": "551d378ab6064a4f46f9fd1b",
      "selectionName": "Louis Oosthuizen",
      "score": 0,
      "potIndex": 2
    }
  ];

var dripper = function () {
    var sel = selections[Math.floor((Math.random() * 14) + 1)];
    var score = Math.floor((Math.random() * 12)) - 10;
    console.log(sel.selectionName + ' >> ' + score);

    restler.putJson('http://localhost:8080/competition/push/56a52965d4c622243710639e', {
        'selectionId': sel.selection,
        'score': score
    }).on('complete', function (data) {
        console.log(data);
    });
};

repeat(dripper).every(10, 'sec')
    .for(60, 'min')
    .start.now()
    .then(function () {
        console.log('Completed');
        process.exit(code = 0);
    });