var Pick = function (mongoose) {

    var pickSchema = new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        userName: {
            type: String,
            default: '',
            required: true
        },
        competition: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Competition',
            required: true
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