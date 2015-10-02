var concussion = require(".."),
    Concussion = concussion.Concussion,
    expect = require("expect.js"),
    sinon = require("sinon");

describe("concussion(object)", function() {
    it("should return Concussion with configured headers object", function() {
        var headers = {"X-Foo": "example"},
            concuss = concussion(headers);

        expect(concuss.headers).to.be(headers);
        expect(concuss.read).to.be.a("function");
        expect(concuss.write).to.be.a("function");
        expect(concuss.remove).to.be.a("function");
    });
});

describe("read(object, string)", function() {
    var headers;

    beforeEach(function() {
        headers = {"X-Foo": "example"};
    });

    it("should read header value", function() {
        expect(concussion.read(headers, "X-Foo")).to.be("example");
    });

    it("should be case-insensitive", function() {
        expect(concussion.read(headers, "x-foo")).to.be("example");
    });

    it("should return undefined on missing value", function() {
        expect(concussion.read(headers, "foo-foo")).to.be(undefined);
    });
});

describe("write(object, string, string)", function() {
    var headers;

    beforeEach(function() {
        headers = {"X-Foo": "example"};
    });

    it("should write new header value", function() {
        concussion.write(headers, "X-Bar", 13);
        expect(concussion.read(headers, "X-Bar")).to.be(13);
    });

    it("should update existing value", function() {
        concussion.write(headers, "X-Foo", 42);
        expect(concussion.read(headers, "X-Foo")).to.be(42);
    });

    it("should be case-insensitive", function() {
        concussion.write(headers, "x-foo", 42);
        expect(concussion.read(headers, "X-Foo")).to.be(42);
    });

    it("should preserve case of initial write", function() {
        expect(headers["x-foo"]).to.be(undefined);
        expect(headers["X-Foo"]).to.be("example");

        concussion.write(headers, "x-foo", 42);
        expect(headers["x-foo"]).to.be(undefined);
        expect(headers["X-Foo"]).to.be(42);
    });
});

describe("remove(object, string)", function() {
    var headers;

    beforeEach(function() {
        headers = {"X-Foo": "example"};
    });

    it("should remove existing header", function() {
        concussion.remove(headers, "X-Foo");
        expect(headers["X-Foo"]).to.be(undefined);
    });

    it("should be case-insensitive", function() {
        concussion.remove(headers, "x-foo");
        expect(headers["X-Foo"]).to.be(undefined);
    });
});

describe("Concussion", function() {
    it("should accept headers arguments", function() {
        var headers = {"X-Foo": "example"},
            concuss = concussion(headers);

        expect(concuss.headers).to.be(headers);
    });

    describe(".write(string, string)", function() {
        it("should invoke write() with bound headers", function() {
            var headers = {"X-Foo": "example"},
                concuss = concussion(headers);

            concuss.write("X-Bar", "boof");
            expect(headers["X-Bar"]).to.be("boof");
        });
    });

    describe(".read(string)", function() {
        it("should invoke read() with bound headers", function() {
            var headers = {"X-Foo": "example"},
                concuss = concussion(headers);

            expect(concuss.read("X-Foo")).to.be("example");
        });
    });

    describe(".remove(string)", function() {
        it("should invoke remove() with bound headers", function() {
            var headers = {"X-Foo": "example"},
                concuss = concussion(headers);

            concuss.remove("X-Foo");
            expect(headers["X-Bar"]).to.be(undefined);
        });
    });
});


