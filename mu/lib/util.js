/**
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 * @laboratory Outright Mental Inc.
 */

/* global module */
module.exports = {

    /**
     * Util @ Debug Level
     * @param {string} c_orig
     * @param {number} r_pos
     * @param {number} r_length
     * @param {string} c_new
     */
    replaceSubstring: function (c_orig, r_pos, r_length, c_new) {
        if (c_orig.length < r_pos + r_length) {
            return c_orig;
        }
        return c_orig.substr(0, r_pos) + c_new + c_orig.substr(r_pos + r_length);
    }

};