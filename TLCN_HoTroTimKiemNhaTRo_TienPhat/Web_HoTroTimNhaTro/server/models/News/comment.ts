import mongoose, { Document, Schema, Model, model } from "mongoose"

interface IComment extends Document {
  idnews: string
  idmb: string
  contentcomment: string
  timeComment: Date
}

const CommentSchema = new Schema(
  {
    idnews: {
      type: String,
      required: true,
    },
    idmb: {
      type: String,
      required: true,
    },
    contentcomment: {
      type: String,
      required: true,
    },
    timeComment: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
)

export default  model("Comment", CommentSchema)