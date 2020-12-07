"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _constants = require("../../constants");

var _Models = require("../Models");

var _Schemas = require("../Schemas");

var _tableName = _interopRequireDefault(require("../tableName"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SeedModel = _mongoose.default.model(_tableName.default.seed, _Schemas.SeedSchema);

const seed_1606213078214 = () => {
  const seed = 1606213078214;
  SeedModel.findOne({
    body: seed
  }).then(res => {
    if (!res) {
      const newSeed = new SeedModel({
        body: seed
      });
      newSeed.save();

      _constants.category_default.forEach(category => {
        const newCategory = new _Models.CategoryModel({
          name: category,
          description: ''
        });
        newCategory.save();
      });
    }
  });
};

const run_seeds = () => {
  seed_1606213078214();
};

run_seeds();