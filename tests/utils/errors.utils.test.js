const assert = require("assert");
const {
  HttpForbidden,
  HttpServiceUnavailable,
} = require("../../utils/errors.utils");

describe("errors.utils", () => {
  describe("HttpForbidden", () => {
    it("should return a 403 code", () => {
      assert.strictEqual(new HttpForbidden().code, 403);
    });
  });

  describe("HttpServiceUnavailable", () => {
    it("should return a 503 code", () => {
      assert.strictEqual(new HttpServiceUnavailable().code, 503);
    });
  });
});
