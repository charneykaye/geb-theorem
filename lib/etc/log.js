/**
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 * @laboratory Outright Mental Inc.
 */
var LEVEL_DEBUG = true,
  LEVEL_INFO = true,
  LEVEL_WARN = true,
  LEVEL_ERROR = true;

/* global module */
module.exports = {

  /**
   * Log @ Debug Level
   * @param message
   */
  debug: function (message) {
    if (LEVEL_DEBUG) {
      console.log(message);
    }
  },

  /**
   * Log @ Info Level
   * @param message
   */
  info: function (message) {
    if (LEVEL_INFO) {
      console.log(message);
    }
  },

  /**
   * Log @ Warn Level
   * @param message
   */
  warn: function (message) {
    if (LEVEL_WARN) {
      console.log(message);
    }
  },

  /**
   * Log @ Error Level
   * @param message
   */
  error: function (message) {
    if (LEVEL_ERROR) {
      console.log(message);
    }
  }

};
