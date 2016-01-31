var Pick = function (mongoose) {

    var pickSchema = new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        competition: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Competition'
        },
        selections: [{
            selection: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Selection'
            }
        }]
    });


    return mongoose.model('Pick', pickSchema);
};

exports = module.exports = Pick;