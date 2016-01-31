var User = function (mongoose) {

    var userSchema = new mongoose.Schema({
        name: String,
        email: {type: String, unique: true},
        password: String,
        created: {type: Date, default: Date.now},
        admin: {type: Boolean, default: false},
        superAdmin: {type: Boolean, default: false},
        venueOwner: {type: Boolean, default: false},
        resetPasswordToken: String,
        resetPasswordExpires: Date,
        favs: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
    });


    return mongoose.model('User', userSchema);
};

exports = module.exports = User;