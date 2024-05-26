import rn from "random-number"; // library ramdom number
import Nexmo from "nexmo"; // library send OTP
import multer from "multer";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";

import User from "../models/User/user.model";
import FeedBack from "../models/User/feedback";

//###########__Login__#####################
export const login = (req: any, res: any) => {
  res.json({
    message: req.flash("loginMessage"),
    result: false,
  });
};

export const loginsuccess = (req: any, res: any) => {
  const usernamelogin = req.user.local.username;
  res.json({
    message: "Đăng nhập thành công",
    result: true,
    usernamelogin: usernamelogin,
    role: req.user.role,
  });
};

//###########__Register__###################
export const register = (req: any, res: any) => {
  res.json({
    message: req.flash("signupMessage"),
    result: false,
  });
};

export const registersuccess = (req: any, res: any) => {
  res.json({
    message: "Đăng ký thành công",
    result: true,
  });
};

// get infor user login
export const logout = (req: any, res: any) => {
  if (req.isAuthenticated()) {
    req.logout();
    res.json({
      message: "Đăng xuất thành công",
      result: true,
    });
  } else {
    res.json({
      message: "Bạn không có quyền này",
      result: false,
    });
  }
};

export const getInforUser = (req: any, res: any) => {
  if (req.isAuthenticated()) {
    res.json({
      result: true,
      username: req.user.local.username,
      role: req.user.role,
      number_phone: req.user.number_phone,
      img_avatar: req.user.infor.img_avatar,
    });
  } else {
    res.json({
      message: "Bạn không có quyền này",
      result: false,
    });
  }
};

//  Accuracy(Xác thực) send OTP Phone Number
var keyOTP: number[] = [];

export const accuracyPhone_NB = async (req: any, res: any) => {
  const nexmo = new Nexmo({
    apiKey: "686397fb",
    apiSecret: "dymeBDUp59WbNqzO",
  });

  let { number_phone_post } = req.body;
  if (req.isAuthenticated()) {
    var gen = await rn.generator({
      min: 1000,
      max: 9999,
      integer: true,
    });
    var code = gen();
    keyOTP.push(code);
    var text = " PhongTroVN gui ma xac minh " + code + " Cam on!! ";

    await nexmo.message.sendSms(
      " PhongTroVN ",
      number_phone_post,
      text,
      {},
      (err: any, result: any) => {
        if (err) console.log(err);
        console.log(parseInt(number_phone_post, 10) + " ma xac minh   " + code);
        res.json({
          result: true,
          message: "Đã gửi OTP thành công",
        });
      }
    );
    //  key_OTP se bi xoa trong vong 3 phut   =>>>>> bug then  2 acconut send OTP
    setTimeout(() => {
      keyOTP.splice(keyOTP.indexOf(code), 1);
    }, 1000 * 60);
  } else {
    res.json({
      message: "Bạn cần phải đăng nhập để thực hiện chức năng này",
      result: false,
    });
  }
  console.log(keyOTP);
};

//  Xác thực mã OTP
export const accuracyPhone_NB_key_OTP = async (req: any, res: any) => {
  if (req.isAuthenticated()) {
    let { key_OTP, number_phone } = req.body;
    if (keyOTP.indexOf(parseInt(key_OTP)) === -1) {
      res.json({
        message:
          "Vui lòng kiểu tra lại mã OTP hoặc OTP của bạn quá lâu! Bạn cần chờ 60 giây để nhập lại mã",
        result: false,
      });
    } else {
      await User.findByIdAndUpdate(
        { _id: req.user.id },
        { role: "CHUNHATRO", number_phone: number_phone },
        (err: any, result: any) => {
          if (err) console.log(err);
          res.json({
            message: "Xác thực thành công",
            result: true,
          });
          // The key_OTP will be delete if process success
          keyOTP.splice(keyOTP.indexOf(key_OTP), 1);
        }
      );
    }
  } else {
    res.json({
      message: "Bạn cần phải đăng nhập để thực hiện chức năng này",
      result: false,
    });
  }
};

// Đổi mật khẩu
export const ChangePassword = async (req: any, res: any) => {
  if (req.isAuthenticated()) {
    let { password, passwordold } = req.body;
    await bcrypt.compare(
      passwordold,
      req.user.local.password,
      (err: any, isMacth: boolean) => {
        if (err) {
          console.log(err);
        }
        if (!isMacth) {
          res.json({
            result: false,
            message: "Đổi mật khẩu thất bại!!",
          });
        } else {
          bcrypt.hash(password, 10, (err: any, hash: string) => {
            if (err) throw err;
            User.findByIdAndUpdate(
              { _id: req.user.id },
              { "local.password": hash },
              (err: any) => {
                if (err) console.log(err);
                res.json({
                  message: "Đổi mật khẩu thành công!!",
                  result: true,
                });
              }
            );
          });
        }
      }
    );
  } else {
    res.json({
      message: "Bạn cần phải đăng nhập để thực hiện chức năng này",
      result: false,
    });
  }
};

// User FeedBack (Người dùng đánh giá)
export const xFeedBack = async (req: any, res: any) => {
  if (req.isAuthenticated()) {
    let { titelfeedback, contentfeedback } = req.body;
    let feedback = new FeedBack();
    feedback.titelfeedback = titelfeedback;
    feedback.contentfeedback = contentfeedback;
    feedback.iduser = req.user.id;

    try {
      await feedback.save();
      res.json({
        message: "Đánh giá thành công!! PhongTRoVN sẽ ghi nhận ý kiến của bạn",
        result: true,
      });
    } catch (err) {
      console.error(err);
    }
  } else {
    res.json({
      message: "Bạn cần phải đăng nhập để thực hiện chức năng này",
      result: false,
    });
  }
};

// Get list FeedBack to database
export const GetFeedBack = async (req: any, res: any) => {
  try {
    const result = await FeedBack.find()
      .sort({ "infor.date_now": -1 })
      .limit(6)
      .exec();

    res.json({
      feedbacks: result,
    });
  } catch (err) {
    res.json({
      result: false,
      message: err,
    });
  }
};

// get Info User By Id (Lấy thông tin user từ id)
export const getInforUserById = async (req: any, res: any) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) throw new Error("Not found");

    let namerole = "Không xác định";
    if (user.role === "MEMBER") {
      namerole = "THÀNH VIÊN";
    }
    if (user.role === "CHUNHATRO") {
      namerole = "CHỦ NHÀ TRỌ";
    }
    let usered = {
      id: user.id,
      firstname: user.infor!.firstname,
      lastname: user.infor!.lastname,
      role: namerole,
      number_phone: user.number_phone,
    };
    res.json({
      user: usered,
    });
  } catch (err) {
    console.error(err);
    res.json({
      result: false,
      message: err + "",
    });
  }
};

//  Edit profile User
export const getInforUserEdit = (req: any, res: any) => {
  if (req.isAuthenticated()) {
    res.json({
      user: req.user,
    });
  } else {
    res.json({
      message: "Bạn cần phải đăng nhập để thực hiện chức năng này",
      result: false,
    });
  }
};

// Upload image user avatar
const storageuser = multer.diskStorage({
  destination: "./public/uploads_user_av/",
  filename: function (req: any, file: any, cb: any) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  },
});

const uploadAvatarUser = multer({
  storage: storageuser,
  limits: { fileSize: 1000000 },
}).single("file");

export const UploadUserEditAvatar = async (req: any, res: any) => {
  try {
    if (req.isAuthenticated()) {
      await uploadAvatarUser(req, res, (err: any) => {
        if (err) {
          console.log(err);
          res.json({
            result: false,
            message_err: "Không thể upload Ảnh",
          });
        }
        res.json({
          result: true,
          filename_avatar: req.file.filename,
        });
      });
    } else {
      res.json({
        message: "Bạn không có quyền này",
        result: false,
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      result: false,
      message_err: "Không thể upload Ảnh",
    });
  }
};

export const OpenAvatarUser = async (req: any, res: any) => {
  let imagename = "public/uploads_user_av/" + req.params.nameimage;
  await fs.readFile(imagename, (err: any, ImageData: any) => {
    if (err)
      res.json({
        result: false,
        message_err: "Lỗi không thể load ảnh",
      });
    res.setHeader("Content-Type", "image/jpeg");
    res.end(ImageData);
  });
};

// Summit Edit Infor User
export const EditedInforUser = async (req: any, res: any) => {
  try {
    let { firstname, lastname, male, female, img_avatar } = req.body;
    await User.findByIdAndUpdate(
      { _id: req.user.id },
      {
        "infor.firstname": firstname,
        "infor.lastname": lastname,
        "infor.male_female.male": male,
        "infor.male_female.female": female,
        "infor.img_avatar": img_avatar,
      },
      (err: any, result: any) => {
        if (err) console.log(err);
        User.findById({ _id: result._id }, (err: any, result: any) => {
          if (err) console.log(err);
          res.json({
            useredited: result,
            result: true,
            message: "Chỉnh sửa thông tin thành công!!!",
          });
        });
      }
    );
  } catch (err) {
    res.json({
      result: false,
      message: err,
    });
  }
};
