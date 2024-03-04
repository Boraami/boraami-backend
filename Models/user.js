
const mongoose = require('mongoose');
const schema = mongoose.Schema;


const userSchema = new schema({

    userName:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    displayName:{
        type:String,
        required:false
    },
    displayPicture:{
        type:String,
        required: false
    },
    bio:{
        //ask frontend to limit this
      type: String,
      required: false
    },
    followers:{
        type: Number,
        required: false
    },
    following:{
        type: Number,
        required: false
    },
    createdDate:{
      type: Date,
      required: false
    }

})

const User = mongoose.model('users', userSchema);
module.exports = User;
