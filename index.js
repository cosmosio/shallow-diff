/**
* @license shallow-diff https://github.com/cosmosio/shallow-diff
*
* The MIT License (MIT)
*
* Copyright (c) 2014 Olivier Scherrer <pode.fr@gmail.com>
*/
"use strict";

var assert = require("assert"),
  loop = require("simple-loop");

/**
 * Make a diff between two objects
 * @param {Array/Object} base the base object
 * @param {Array/Object} compared the object to compare the base with
 * @example:
 *  With objects:
 *
 *  base = {a:1, b:2, c:3, d:4, f:6}
 *  compared = {a:1, b:20, d: 4, e: 5}
 *  will return :
 *  {
 *      unchanged: ["a", "d"],
 *      updated: ["b"],
 *      deleted: ["f"],
 *      added: ["e"]
 *  }
 *
 * It also works with Arrays:
 *
 *  base = [10, 20, 30]
 *  compared = [15, 20]
 *  will return :
 *  {
 *      unchanged: [1],
 *      updated: [0],
 *      deleted: [2],
 *      added: []
 *  }
 *
 * @returns object
 */
module.exports = function shallowDiff(base, compared) {
  assert(typeof base == "object", "the first object to compare with shallowDiff needs to be an object");
  assert(typeof compared == "object", "the second object to compare with shallowDiff needs to be an object");

  var unchanged = [],
      updated = [],
      deleted = [],
      added = [];

   // Loop through the compared object
   loop(compared, function (value, idx) {

       // To get the added
       if (typeof base[idx] == "undefined") {
           added.push(idx);

       // The updated
     } else if (value !== base[idx]) {
           updated.push(idx);

       // And the unchanged
     } else if (value === base[idx]) {
           unchanged.push(idx);
       }

   });

   // Loop through the before object
   loop(base, function (value, idx) {

      // To get the deleted
      if (typeof compared[idx] == "undefined") {
          deleted.push(idx);
      }
   });

  return {
      updated: updated,
      unchanged: unchanged,
      added: added,
      deleted: deleted
  };
};
