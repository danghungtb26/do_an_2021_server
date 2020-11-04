"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _constants = require("../../constants");

var _Schemas = require("../Schemas");

var _tableName = _interopRequireDefault(require("../tableName"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RoleModel = _mongoose.default.model(_tableName.default.role, _Schemas.RoleSchema);

const SeedModel = _mongoose.default.model(_tableName.default.seed, _Schemas.SeedSchema);

const seed_1603179342533 = () => {
  const seed = 1603179342533;
  SeedModel.findOne({
    body: seed
  }).then(res => {
    if (!res) {
      const newSeed = new SeedModel({
        body: seed
      });
      newSeed.save();

      _constants.roles_list.forEach(role => {
        const newRole = new RoleModel({
          name: role,
          description: ''
        });
        newRole.save();
      });
    }
  });
};

const run_seeds = () => {
  seed_1603179342533();
};

run_seeds();