import mongoose, { Document, Schema, Model, model } from "mongoose"

interface ITypeNews extends Document {
  idnews: string
  nametype: string
}

const TypeNewsSchema = new Schema(
  {
    idnews: {
      type: String,
      required: true,
    },
    nametype: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  },
)

export default  model("TypeNews", TypeNewsSchema)