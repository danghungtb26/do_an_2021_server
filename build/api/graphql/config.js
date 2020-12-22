"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.server = exports.setuphttp = exports.setupGraphql = void 0;

var _config = require("../database/config");

var _queries = _interopRequireDefault(require("./queries"));

var _resolvers = require("./resolvers");

var _typedefs = _interopRequireDefault(require("./typedefs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  ApolloServer
} = require('apollo-server-express'); // const pubsub = new PubSub()
// const typeDefs = gql`
//   type Subscription {
//     postAdded: Hello
//   }
//   type Hello {
//     a: String
//   }
//   type Query {
//     hello(a: String): Hello
//   }
//   type Mutation {
//     add_hello: String
//     hello(a: String): Hello
//   }
// `


const resolvers = {
  // Subscription: {
  //   postAdded: {
  //     subscribe: () => pubsub.asyncIterator([ADD_DDD]),
  //   },
  // },
  Query: { ..._queries.default
  },
  Mutation: { ..._resolvers.UserResolvers,
    ..._resolvers.ProductResolvers,
    ..._resolvers.UploadResolvers,
    ..._resolvers.resolver
  }
};
const server = new ApolloServer({
  typeDefs: _typedefs.default,
  resolvers,
  tracing: true,
  context: ({
    req
  }) => {
    const auth = req.headers.authorization || '';
    return {
      auth
    };
  }
});
exports.server = server;

const setupGraphql = app => {
  server.applyMiddleware({
    app
  });
  console.log(`🚀 Server ready at http://localhost:${_config.hostApi}${server.graphqlPath}`);
};

exports.setupGraphql = setupGraphql;

const setuphttp = httpServer => {
  server.installSubscriptionHandlers(httpServer);
  console.log(`🚀🥵 Server ready at ws://localhost:${_config.hostApi}${server.subscriptionsPath}`);
};

exports.setuphttp = setuphttp;