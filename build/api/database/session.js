"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runWithSession = exports.test = void 0;

var _mongoose = require("mongoose");

const test = () => {}; // func chay cung voi session


exports.test = test;

const runWithSession = async (process, successcb, errorcb) => {
  let session;

  try {
    // khoi tai transaction
    session = await (0, _mongoose.startSession)({
      defaultTransactionOptions: {
        writeConcern: {
          w: 'majority'
        },
        readConcern: {
          level: 'snapshot'
        }
      }
    });
    await session.startTransaction({
      writeConcern: {
        w: 'majority'
      },
      readConcern: {
        level: 'snapshot'
      }
    }); // func chay trong session
    // param bao gồm session và func commit session

    if (typeof process === 'function') {
      await process(session, async () => {
        await session.commitTransaction();
      });
    }
  } catch (error) {
    if (typeof errorcb === 'function') {
      errorcb(error);
    }

    await session.abortTransaction();
  } finally {
    // ket thuc tat ca se ket thuc session
    if (session) session.endSession();
  }
};

exports.runWithSession = runWithSession;