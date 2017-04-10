var Link = require('../models/link');

describe("Link", function () {
    it("correctly construct an object when mistakenly called without new", function () {
        var link = Link({ origin: 'B', destination: 'A', description: 'desc'});
        expect(link).toEqual(jasmine.any(Link));
    });
    
    it("does not throw an error if options are correct", function () {
        expect(function() {
            return new Link({ origin: 'A', destination: 'B', description: 'desc'});
        }).not.toThrow();    
    });
    
    it("throws an error if origin is not defined", function () {
        expect(function() {
            return new Link({ destination: 'A', description: 'desc'});
        }).toThrow();    
    });
    
    it("throws an error if destination is not defined", function () {
        expect(function() {
            return new Link({ origin: 'A', description: 'desc'});
        }).toThrow();    
    });
    
    it("throws an error if description is not defined", function () {
        expect(function() {
            return new Link({ origin: 'A', destination: 'desc'});
        }).toThrow();    
    });
    
    it("throws an error if origin is not a string", function () {
        expect(function() {
            return new Link({ origin: 1234, destination: 'destination', description: 'description'});
        }).toThrow();    
    });
    
    it("throws an error if destination is not a string", function () {
        expect(function() {
            return new Link({ origin: 'origin', destination: 123, description: 'description'});
        }).toThrow();    
    });
    
    it("throws an error if description is not a string", function () {
        expect(function() {
            return new Link({ origin: 'A', destination: 'dest', description: 123 });
        }).toThrow();    
    });
    
    it("throws an error if origin is equal to destination", function () {
        expect(function() {
            return new Link({ origin: 'A', destination: 'A', description: 'description'});
        }).toThrow();    
    });

    it("transform the instance to a POJO when #asObject is called on it", function () {
        var link = new Link({ origin: 'A', destination: 'B', description: 'description'});
        var obj = link.asObject();
        expect(obj).toEqual({origin: "A", destination: "B", description :"description"});
    });
});
