var restler = require('restler');
var _ = require('lodash');

var users = [
    {
        '_id' : '5510747e7d22838d1d7c9fad',
        'name' : 'Andy Gray'
    },
    {
        '_id' : '5512b6ed8c326fad70e22349',
        'name' : 'Chris Jones'
    },
    {
        '_id' : '55237a01bcfae4de67b07ecf',
        'name' : 'Paul Craig'
    },
    {
        '_id' : '5523a2d2bcfae4de67b07ed8',
        'name' : 'Marcus Johansson'
    },
    {
        '_id' : '5523a2dfbcfae4de67b07ed9',
        'name' : 'Gary Shergill'
    },
    {
        '_id' : '5523a32dbcfae4de67b07eda',
        'name' : 'Rob Lynn'
    },
    {
        '_id' : '5523a3a5bcfae4de67b07edc',
        'name' : 'Danny Moore'
    },
    {
        '_id' : '5523a539bcfae4de67b07ee4',
        'name' : 'Val'
    },
    {
        '_id' : '5523a549bcfae4de67b07ee5',
        'name' : 'Lee Lewis'
    },
    {
        '_id' : '5523a54ebcfae4de67b07ee6',
        'name' : 'Richard Priest'
    },
    {
        '_id' : '5523a598bcfae4de67b07eee',
        'name' : 'Gavin Rose'
    },
    {
        '_id' : '5523a5b5bcfae4de67b07efd',
        'name' : 'kevin'
    },
    {
        '_id' : '5523a85cbcfae4de67b07f0c',
        'name' : 'Joe Maughan'
    },
    {
        '_id' : '5523a942bcfae4de67b07f1b',
        'name' : 'Stephen Hoilett'
    },
    {
        '_id' : '5523a987bcfae4de67b07f1c',
        'name' : 'scott p'
    },
    {
        '_id' : '5523ad14bcfae4de67b07f24',
        'name' : 'Mark McGuffin'
    },
    {
        '_id' : '5523ae19bcfae4de67b07f25',
        'name' : 'David Wilde'
    },
    {
        '_id' : '5523ae25bcfae4de67b07f26',
        'name' : 'Keelan Draper'
    },
    {
        '_id' : '5523af07bcfae4de67b07f35',
        'name' : 'Justin'
    },
    {
        '_id' : '5523af08bcfae4de67b07f36',
        'name' : 'Jim Keefe'
    },
    {
        '_id' : '5523b158bcfae4de67b07f3e',
        'name' : 'Dan Benns'
    },
    {
        '_id' : '5523b176bcfae4de67b07f3f',
        'name' : 'Mark Wright'
    },
    {
        '_id' : '5523b254bcfae4de67b07f47',
        'name' : 'Tom Wilkins'
    },
    {
        '_id' : '5523b2a0bcfae4de67b07f4f',
        'name' : 'paul calnan'
    },
    {
        '_id' : '5523b369bcfae4de67b07f51',
        'name' : 'Brad Smith'
    },
    {
        '_id' : '5523b410bcfae4de67b07f59',
        'name' : 'Spyro Markesinis'
    },
    {
        '_id' : '5523b4bcbcfae4de67b07f5a',
        'name' : 'Sean Tookey'
    },
    {
        '_id' : '5523b512bcfae4de67b07f5b',
        'name' : 'Darshan Vashee'
    },
    {
        '_id' : '5523b7babcfae4de67b07f5c',
        'name' : 'Chris Yard'
    },
    {
        '_id' : '5523b7bfbcfae4de67b07f5d',
        'name' : 'Mark Llewellyn'
    },
    {
        '_id' : '5523ba17bcfae4de67b07f65',
        'name' : 'Sean Smiffy'
    },
    {
        '_id' : '5523ba3fbcfae4de67b07f66',
        'name' : 'Dan Clark'
    },
    {
        '_id' : '5523c081bcfae4de67b07f7c',
        'name' : 'Rayne Jones'
    },
    {
        '_id' : '5523c1fdbcfae4de67b07f7d',
        'name' : 'Ruth Ursell'
    },
    {
        '_id' : '5523c217bcfae4de67b07f85',
        'name' : 'Danny Goldsbrough'
    },
    {
        '_id' : '5523ca12bcfae4de67b07f9b',
        'name' : 'Callum Morrison'
    },
    {
        '_id' : '5523ca99bcfae4de67b07fa3',
        'name' : 'Dan Davis'
    },
    {
        '_id' : '5523cc02bcfae4de67b07fa4',
        'name' : 'Peter Fawn'
    },
    {
        '_id' : '5523ce57bcfae4de67b07fac',
        'name' : 'James Smith'
    },
    {
        '_id' : '5523d072bcfae4de67b07fad',
        'name' : 'James McLean'
    },
    {
        '_id' : '5523d141bcfae4de67b07fae',
        'name' : 'Sebastian Persson'
    },
    {
        '_id' : '5523e2dcbcfae4de67b07fb6',
        'name' : 'Nick McMullan'
    },
    {
        '_id' : '5523e49fbcfae4de67b07fb7',
        'name' : 'Kevin Gray'
    },
    {
        '_id' : '5523e8e7bcfae4de67b07fbf',
        'name' : 'john peckham'
    },
    {
        '_id' : '5523eb2cbcfae4de67b07fc0',
        'name' : 'Matt Morris'
    },
    {
        '_id' : '5523ec8abcfae4de67b07fc8',
        'name' : 'David Barnby'
    },
    {
        '_id' : '5524d5ddbcfae4de67b08099',
        'name' : 'James Morgan'
    },
    {
        '_id' : '5524e79abcfae4de67b080a1',
        'name' : 'Jon Paul Packer'
    },
    {
        '_id' : '5524eb33bcfae4de67b080a2',
        'name' : 'Rich Minns'
    },
    {
        '_id' : '5524ef07bcfae4de67b080aa',
        'name' : 'Darryn Bosch'
    }
];

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
]

users.forEach(function (u) {

    var randomSelection = [];
    randomSelection.push(selections[Math.floor((Math.random() * 6) + 1)].selection);
    randomSelection.push(selections[Math.floor((Math.random() * 6) + 1)].selection);
    randomSelection.push(selections[Math.floor((Math.random() * 6) + 1)].selection);

    restler.postJson('http://localhost:8080/auth/picks', {
        'user': u._id,
        'userName': u.name,
        'competition': '56a52965d4c622243710639e',
        'selections': randomSelection
    }).on('complete', function (data) {
        console.log(data);
    });
});