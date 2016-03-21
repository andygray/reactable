var Game = function (mongoose) {

    // type: ascending or descending
    var gameSchema = new mongoose.Schema({
        name: String,
        shortName: {type: String, unique: true},
        parent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Brand'
        },
        reverse: {type: Boolean, default: "true"},
        type: {type: String, default: "highest_first"},
        description: String,
        rules: String,
        status: {type: String, default: "pending"},
        image: String,
        private: {type: Boolean, default: false},
        competitions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Competition' }]
    });

    return mongoose.model('Game', gameSchema);
};

exports = module.exports = Game;