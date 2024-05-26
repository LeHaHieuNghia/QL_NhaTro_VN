import mongoose, { Document, Schema, Model, model } from "mongoose";

interface IUser extends Document {
  infor: {
    firstname: string;
    lastname: string;
    male_female: {
      male: boolean;
      female: boolean;
    };
    img_avatar: string;
  };
  local: {
    username: string;
    password: string;
    email: string;
  };
  role: string;
  number_phone: number;
}

const UserSchema = new Schema(
  {
    infor: {
      firstname: {
        type: String,
        required: true,
      },
      lastname: {
        type: String,
        required: true,
      },
      male_female: {
        male: {
          type: Boolean,
          default: true,
        },
        female: {
          type: Boolean,
          default: false,
        },
      },
      img_avatar: {
        type: String,
        default: "",
      },
    },
    local: {
      username: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "MEMBER",
    },
    number_phone: {
      type: Number,
      default: "",
    },
  },
  {
    versionKey: false,
  }
);

export default model("users", UserSchema);
