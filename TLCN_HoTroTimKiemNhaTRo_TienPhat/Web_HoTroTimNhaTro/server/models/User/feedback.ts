import mongoose, { Document, Schema, Model, model} from 'mongoose';

interface IFeebBack extends Document {
    iduser: string;
    titelfeedback: string;
    contentfeedback: string;
    timefeedback: Date;
}

const FeebBackSchema = new Schema(
    {
        iduser:{
            type:String,
            required:true
        },
        titelfeedback:{
            type:String,
            required:true
        },
        contentfeedback:{
            type:String,
            required:true
        },
        timefeedback:{
            type:Date,
            default: Date.now
        }
      
    },{
        versionKey:false
    }
);

export default model('FeebBack', FeebBackSchema);