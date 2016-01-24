var Competition = function (mongoose) {

    var competitionSchema = new mongoose.Schema({
        name: String,
        game: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Game'
        },
        description: String,
        image: String,
        order: Boolean,
        shortName: String,
        status: {type: String, default: "open"},
        selections: [{
            selection: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Selection'
            },
            score: {type: Number, default: 0},
            handicap: {type: Number, default: 0},
            multiplier: {type: Number, default: 1},
            potIndex: Number
        }],
        start: Number,
        updated: Number
    });


    return mongoose.model('Competition', competitionSchema);
};

exports = module.exports = Competition;