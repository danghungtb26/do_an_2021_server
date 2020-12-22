"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProductCountOfUser = exports.getProductCountOfCategory = void 0;

var _Models = require("./Models");

const getProductCountOfCategory = async (id, query = {}) => {
  return _Models.ProductModel.find({ ...query,
    category: id
  }).countDocuments();
};

exports.getProductCountOfCategory = getProductCountOfCategory;

const getProductCountOfUser = async (id, query = {}) => {
  return _Models.ProductModel.find({
    owner: id,
    ...query
  }).countDocuments();
};

exports.getProductCountOfUser = getProductCountOfUser;