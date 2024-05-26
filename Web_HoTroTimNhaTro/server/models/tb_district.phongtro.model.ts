import mongoose, { Document, Schema, Model, model } from "mongoose"

interface IDistrict extends Document {
  code: number
  name: string
  type: string
  typename: string
  parent_code: number
}

const DistrictSchema = new Schema(
  {
    code: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    typename: {
      type: String,
      required: true,
    },
    parent_code: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  },
)

export default model("district", DistrictSchema)
