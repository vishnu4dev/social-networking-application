import mongose from 'mongoose';
const Schema = mongose.Schema;
const PostSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'user',
    },
    title:{
        type:String,
        // required:true, 
    },
    text:{
        type:String,
        required:true,
    },
    name:{
        type:String,
    },
    avatar:{
        type:String,
    },
    likes:[
        {
            user:{
                type: Schema.Types.ObjectId,
                ref:'user',
            }
        }
    ],
comment:[
    {
        user:{
            type: Schema.Types.ObjectId,
            ref:'user',
        },
        text:{
            type:String,
            required:true
        },
        name:{
            type:String,
        },
        avatar:{
            type:String,
        },
        date:{
            type:Date,
            default:Date.now,
        }
    }
],
date:{
    type:Date,
    default:Date.now,
}
});

module.exports = new mongose.model('post',PostSchema);