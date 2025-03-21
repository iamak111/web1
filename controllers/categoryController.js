/* eslint-disable array-callback-return */
const categorieModel = require("../models/categorieModel");
const factoryController = require("./factoryHandler");
const catchAsync = require("../util/catchAsync");
// const AppError = require('../util/appError');
const encryptID = require("../util/encryptID");

exports.getAllCategorie = catchAsync(async (req, res, next) => {
  console.log(req.qury)
  const category = await categorieModel.find(
    req.from !== "mobile" || req.query.forWho === "vendor" ? { for: process.env.WEBSITE_CATEGORY } : {}
  );
  
  return res.json({ status: "Success", docs: category });
});
