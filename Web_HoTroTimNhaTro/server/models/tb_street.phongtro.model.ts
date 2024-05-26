import mongoose, { Document, Schema, Model, model} from 'mongoose';

interface IStreet extends Document {
    code: number;
    name: string;
    type: string;
    typename: string;
    parent_code: number;
    parent_code_city: number;
}

const StreetSchema = new Schema(
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
        },
        parent_code:{
            type:Number,
            required:true
        },
        parent_code_city:{
            type:Number,
            required:true
        }
    },{
        versionKey:false
    }
);

export default  model('streets', StreetSchema);