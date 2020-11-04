"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  Schema,
  SchemaTypes
} = _mongoose.default;
/**
 * method sử dụng cho các bản ghi của role
 */

const method = {
  getJson: function getJson() {
    return {
      id: this.uuid,
      name: this.name,
      description: this.description
    };
  },
  getId: function getId() {
    return this._id;
  },
  getName: function getName() {
    return this.name;
  },
  getDescription: function getDescription() {
    return this.description;
  },
  getCreatedAt: function getCreatedAt() {
    return this.created_at;
  },
  getUpdatedAt: function getUpdatedAt() {
    return this.updated_at;
  },
  compareRole: function compareRole(role) {
    return this.name === role;
  },
  compareRoleId: function compareRoleId(id) {
    return this.uuid === id;
  }
};
const Role = new Schema({
  // uuid: v5(table.role),
  name: {
    type: SchemaTypes.String
  },
  description: {
    type: SchemaTypes.String
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  autoIndex: true
});
Role.method(method);
var _default = Role;
exports.default = _default;