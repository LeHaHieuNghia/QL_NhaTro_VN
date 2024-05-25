import { Request, Response } from "express"
import News from "../models/News/news.model"
import Citys from "../models/tb_city.phongtro.model"
import Districts from "../models/tb_district.phongtro.model"

export const News_All = async (req: Request, res: Response) => {
  try {
    const result = await News.find({ "infor.state_news": true })
      .sort({ "infor.date_now": -1 })
      .limit(6)
      .exec()
    res.json({
      All_News: result,
    })
  } catch (err) {
    res.json({
      result: false,
      message: err,
    })
  }
}

export const News_Detail = async (req: Request, res: Response) => {
  try {
    const result = await News.find({ _id: req.params.id })
    res.json({
      news: result,
    })
  } catch (err) {
    res.json({
      result: false,
      message: err,
    })
  }
}

export const GetNameCity = async (req: Request, res: Response) => {
  try {
    const result = await Citys.findOne({ code: req.params.code_city })

    if (!result) throw new Error("not found")

    res.json({
      NameCity: result.name,
    })
  } catch (err) {
    res.json({
      result: false,
      message: err,
    })
  }
}

export const GetNameDictrict = async (req: Request, res: Response) => {
  try {
    const result = await Districts.findOne({ code: req.params.code_dictrict })
    if (!result) throw new Error("not found")
    res.json({
      NameDistricts: result.typename,
    })
  } catch (err) {
    res.json({
      result: false,
      message: err,
    })
  }
}

export const NewsNears = async (req: Request, res: Response) => {
  try {
    const result = await News.find({
      "address.code_city": req.params.code_city,
      "address.code_dictrict": req.params.code_dictrict,
    })
    res.json({
      NewsNears: result,
    })
  } catch (err) {
    res.json({
      result: false,
      NewsNears: "",
      message: err,
    })
  }
}

export const News_RoomHome = async (req: Request, res: Response) => {
  try {
    const result = await News.find({
      "infor.state_news": 1,
      "infor.typehome": 1,
    })
      .sort({ "infor.date_now": -1 })
      .limit(6)
      .exec()
    res.json({
      NewsRoom: result,
    })
  } catch (err) {
    res.json({
      result: false,
      message: err,
    })
  }
}

export const News_HouseHome = async (req: Request, res: Response) => {
  try {
    const result = await News.find({
      "infor.state_news": 1,
      "infor.typehome": 2,
    })
      .sort({ "infor.date_now": -1 })
      .limit(6)
      .exec()
    res.json({
      HouseHome: result,
    })
  } catch (err) {
    res.json({
      result: false,
      message: err,
    })
  }
}

export const News_ApartmentHome = async (req: Request, res: Response) => {
  try {
    const result = await News.find({
      "infor.state_news": 1,
      "infor.typehome": 3,
    })
      .sort({ "infor.date_now": -1 })
      .limit(6)
      .exec()
    res.json({
      ApartmentHome: result,
    })
  } catch (err) {
    res.json({
      result: false,
      message: err,
    })
  }
}

export const NewsFilter = async (req: Request, res: Response) => {
  try {
    const { PriceMin, PriceMax, AcreageMin, AcreageMax } = req.body
    const result = await News.find({
      "infor.price": { $gte: PriceMin, $lte: PriceMax },
      "infor.acreage": { $gte: AcreageMin, $lte: AcreageMax },
      "infor.state_news": 1,
    }).exec()
    res.json({
      NewsFilter: result,
    })
  } catch (err) {
    console.log(err)
    res.json({
      result: false,
      message: err,
    })
  }
}
