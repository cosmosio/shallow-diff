/**
* @license shallow-diff https://github.com/cosmosio/shallow-diff
*
* The MIT License (MIT)
*
* Copyright (c) 2014 Olivier Scherrer <pode.fr@gmail.com>
*/
var sut = require("../index");

var chai = require("chai"),
	expect = chai.expect;

describe("shallow-diff", function () {

	it("should be a function", function () {
		expect(typeof sut).to.equal("function");
	});

	it("should throw an error if base or compared isn't an object or array", function () {
		expect(function () { sut(""); }).to.throw();
		expect(function () { sut("", {}); }).to.throw();
		expect(function () { sut({}, ""); }).to.throw();
		expect(function () {
			sut({}, []);
		}).not.to.throw();
	});

	it("should return an object with changed/deleted/unchanged/added info", function () {
		var result = sut({}, {});
		expect(typeof result).to.equal("object");
		expect(Array.isArray(result.updated)).to.be.true;
		expect(Array.isArray(result.unchanged)).to.be.true;
		expect(Array.isArray(result.added)).to.be.true;
		expect(Array.isArray(result.deleted)).to.be.true;
	});

        it("should should handle `undefined` values", function() {
          var result = sut({a: undefined}, {a: undefined});
          expect(result.added.length).to.equal(0);
          expect(result.deleted.length).to.equal(0);
        });

	describe("with an array", function () {
		var initialArray = ["a", "b", "c", "d"],
			finalArray = ["a", "d", "e"];

		it("should return items that have changed or have been deleted", function () {
			var result = sut(initialArray, finalArray);
			expect(result.updated.length).to.equal(2);
			expect(result.unchanged.length).to.equal(1);
			expect(result.added.length).to.equal(0);
			expect(result.deleted.length).to.equal(1);
			expect(result.updated.sort().join("")).to.equal([1, 2].sort().join(""));
			expect(result.unchanged[0]).to.equal(0);
			expect(result.deleted[0]).to.equal(3);
		});

		it("shouldn't have the same result if arrays are swapped", function () {
			var result = sut(finalArray, initialArray);
			expect(result.added.length).to.equal(1);
			expect(result.added[0]).to.equal(3);
		});
	});

	describe("with an object", function () {
		var initialObject = {a: 10, b: 20, c: 30},
			finalObject = {a:10, c: 40, d: 50};

		it("should return items that have changed or have been deleted", function () {
			var result = sut(initialObject, finalObject);
			expect(result.updated.length).to.equal(1);
			expect(result.updated[0]).to.equal("c");
			expect(result.unchanged.length).to.equal(1);
			expect(result.unchanged[0]).to.equal("a");
			expect(result.deleted.length).to.equal(1);
			expect(result.deleted[0]).to.equal("b");
			expect(result.added.length).to.equal(1);
			expect(result.added[0]).to.equal("d");
		});
	});

});
