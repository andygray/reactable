var Selection = function (mongoose) {

    var selectionSchema = new mongoose.Schema({
        name: {type: String, unique: true},
        metadata: Array,
        nationality: String,
        sport: String,
        avatar: String
    });


    return mongoose.model('Selection', selectionSchema);
};

exports = module.exports = Selection;