var Uglify = require('../../');
var assert = require("assert");

describe("line-endings", function() {
    var options = {
        fromString: true,
        mangle: false,
        compress: false,
        output: {
            beautify: false,
            comments: /^!/,
        }
    };
    var expected_code = '/*!one\n2\n3*/\nfunction f(x){if(x)return 3}';

    it("Should parse LF line endings", function() {
        var js = '/*!one\n2\n3*///comment\nfunction f(x) {\n if (x)\n//comment\n  return 3;\n}\n';
        var result = Uglify.minify(js, options);
        assert.strictEqual(result.code, expected_code);
    });

    it("Should parse CR/LF line endings", function() {
        var js = '/*!one\r\n2\r\n3*///comment\r\nfunction f(x) {\r\n if (x)\r\n//comment\r\n  return 3;\r\n}\r\n';
        var result = Uglify.minify(js, options);
        assert.strictEqual(result.code, expected_code);
    });

    it("Should parse CR line endings", function() {
        var js = '/*!one\r2\r3*///comment\rfunction f(x) {\r if (x)\r//comment\r  return 3;\r}\r';
        var result = Uglify.minify(js, options);
        assert.strictEqual(result.code, expected_code);
    });
});
