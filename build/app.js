"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

require("./api/database");

var _cors = _interopRequireDefault(require("cors"));

var _config = require("./api/database/config");

var _config2 = require("./api/graphql/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import http from 'http'
// import _ from 'lodash'
// import passport from 'passport'
// import users from "./routes/users";
const path = require('path');

const app = (0, _express.default)();
app.use(_express.default.static(`${__dirname}/src`)); // for parsing application/json

app.use(_bodyParser.default.json()); // for parsing application/xwww-

app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use((0, _cors.default)()); // for parsing multipart/form-data
// app.use(upload.array())
// app.use(express.static('public'))
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

app.get('/abc', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'src', 'app', 'index.jsx'));
}); // app.use(passport.initialize())
// app.use(passport.session())
// setup(passport)
// app.use('/api', routers)
// app.use('', image)
// const list = []
// function split(thing) {
//   if (typeof thing === 'string') {
//     return thing.split('/')
//   }
//   if (thing.fast_slash) {
//     return ''
//   }
//   const match = thing
//     .toString()
//     .replace('\\/?', '')
//     .replace('(?=\\/|$)', '$')
//     .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
//   return match ? match[1].replace(/\\(.)/g, '$1').split('/') : `<complex:${thing.toString()}>`
// }
// function print(path, layer) {
//   if (layer.route) {
//     layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
//   } else if (layer.name === 'router' && layer.handle.stack) {
//     layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
//   } else if (layer.method) {
//     list.push(
//       `${layer.method.toUpperCase()} /${path
//         .concat(split(layer.regexp))
//         .filter(Boolean)
//         .join('/')}`
//     )
//   }
// }
// app._router.stack.forEach(print.bind(null, []))
// _.uniq(list).forEach(rou => {
//   console.log('TCL: rou', rou)
// })

app.use((err, req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization');
  res.header('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true'); // if (err.status === 401) {
  //   res.send({
  //     message: 'Không có quyền truy cập',
  //   })
  // }
  // res.status(401).send({
  //   message: 'Không có quyền truy cập',
  // })

  next();
});

const server = require('http').createServer(app);

(0, _config2.setupGraphql)(app);
(0, _config2.setuphttp)(server);
server.listen(process.env.PORT || _config.hostApi, () => {
  console.log(`Server is listening on port ${process.env.PORT || _config.hostApi}`);
});