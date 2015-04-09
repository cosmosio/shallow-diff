/**
 * @license shallow-diff https://github.com/cosmosio/shallow-diff
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2015 Olivier Scherrer <pode.fr@gmail.com>
 */
var sut = require("../index");

var chai = require("chai"),
    expect = chai.expect;

describe("shallow-diff", function() {

    it("should be a function", function() {
        expect(typeof sut).to.equal("function");
    });

    it("should throw an error if base or compared isn't an object or array", function() {
        expect(function() {
            sut("");
        }).to.throw();
        expect(function() {
            sut("", {});
        }).to.throw();
        expect(function() {
            sut({}, "");
        }).to.throw();
        expect(function() {
            sut({}, []);
        }).not.to.throw();
    });

    it("should return an object with changed/deleted/unchanged/added info", function() {
        var result = sut({}, {});
        expect(result).to.eql({
            updated: [],
            unchanged: [],
            added: [],
            deleted: []
        });
    });

    describe("with an array", function() {
        var initialArray = ["a", "b", "c", "d"],
            finalArray = ["a", "d", "e"];

        it("should return items that have changed or have been deleted", function() {
            var result = sut(initialArray, finalArray);
            expect(result).to.eql({
                unchanged: [0],
                updated: [1, 2],
                deleted: [3],
                added: []
            });
        });

        it("shouldn't have the same result if arrays are swapped", function() {
            var result = sut(finalArray, initialArray);
            expect(result.added.length).to.equal(1);
            expect(result.added[0]).to.equal(3);
            expect(result).to.eql({
                unchanged: [0],
                updated: [1, 2],
                deleted: [],
                added: [3]
            });
        });

        it("should should handle `undefined` values", function() {
            var result = sut(
                [undefined],
                [undefined]
            );
            expect(result).to.eql({
                unchanged: [0],
                updated: [],
                deleted: [],
                added: []
            });
        });
    });

    describe("with an object", function() {
        var initialObject = {
                a: 10,
                b: 20,
                c: 30
            },
            finalObject = {
                a: 10,
                c: 40,
                d: 50
            };

        it("should return items that have changed or have been deleted", function() {
            var result = sut(initialObject, finalObject);
            expect(result).to.eql({
                updated: ["c"],
                unchanged: ["a"],
                deleted: ["b"],
                added: ["d"]
            });
        });

        it("should should handle `undefined` values", function() {
            var result = sut({
                a: undefined
            }, {
                a: undefined
            });
            expect(result).to.eql({
                unchanged: ["a"],
                updated: [],
                deleted: [],
                added: []
            });
        });
    });

});