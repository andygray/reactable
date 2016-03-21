var Competition = function (mongoose) {

    var competitionSchema = new mongoose.Schema({
        name: String,
        game: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Game'
        },
        description: String,
        image: {type: String, default: ""},
        order: {type: Boolean, default: true},
        shortName: {type: String, unique: true},
        status: {type: String, default: "open"},
        selections: [{
            selection: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Selection'
            },
            selectionName: {type: String, default: ''},
            score: {type: Number, default: 0},
            handicap: {type: Number, default: 0},
            multiplier: {type: Number, default: 1},
            potIndex: {type: Number, default: 0},
            _id: false
        }],
        start: {type: Number, default: 0},
        updated: {type: Number, default: 0}
    });


    return mongoose.model('Competition', competitionSchema);
};

exports = module.exports = Competition;