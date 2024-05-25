import mongoose, { Document, Schema, Model, model} from 'mongoose';

interface ICity extends Document {
    code: number;
    name: string;
    type: string;
    typename: string;
}

const CitySchema = new Schema(
    {
        code: {
            type:Number,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        type:{
            type:String,
            required:true
        },
        typename:{
            type:String,
            required:true
        }
    },{
        versionKey:false
    }
);

export default model('citys', CitySchema);