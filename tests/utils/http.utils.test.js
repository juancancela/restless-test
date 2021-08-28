require("dotenv").config({ path: ".env.test" });
const assert = require("assert");
const fetchMock = require("fetch-mock");

const { get } = require("../../utils/http.utils");

const validSchema = {
  type: "array",
  items: {
    properties: {
      username: { type: "string" },
    },
    required: ["username"],
  },
  transform: (items) => items.map((i) => i.username),
};

const invalidSchemaWithInvalidTransformer = {
  type: "array",
  items: {
    properties: {
      username: { type: "string" },
    },
    required: ["username"],
  },
  transform: (items) => items.invalidProperty,
};

const validSchemaNoTransformer = {
  type: "array",
  items: {
    properties: {
      username: { type: "string" },
    },
    required: ["username"],
  },
};

describe("http.utils", () => {
  it("should fail and not attempt to retry if the response server responds an HTTP 403 status code", async () => {
    fetchMock.get("http://www.someurl8.com", 403);
    try {
      await get("http://www.someurl8.com");
    } catch (e) {
      fetchMock.reset();
      assert.strictEqual(e.code, 403);
      return;
    }
    assert.fail();
  });

  it("should fail if the response server responds an HTTP 400 status code", async () => {
    fetchMock.get("http://www.someurl7.com", 400);
    try {
      await get("http://www.someurl7.com");
    } catch (e) {
      fetchMock.reset();
      assert.ok(true);
      return;
    }
    assert.fail();
  });

  it("should fail if the response is a valid JSON but the provided schema has a transform function that fails", async () => {
    fetchMock.get("http://www.someurl6.com", [{ hello: "world" }]);
    try {
      await get("http://www.someurl6.com", invalidSchemaWithInvalidTransformer);
    } catch (e) {
      fetchMock.reset();
      assert.ok(true);
      return;
    }
    assert.fail();
  });

  it("should return a valid response, even if it takes a long time to get back", async () => {
    fetchMock.get(
      "http://www.someurl9.com",
      [{ username: "juan", email: "cancela.juancarlos@gmail.com" }],
      {
        delay: 5000,
      }
    );
    const result = await get(
      "http://www.someurl9.com",
      validSchemaNoTransformer
    );
    assert.strictEqual(result[0].username, "juan");
    assert.strictEqual(result[0].email, "cancela.juancarlos@gmail.com");
    fetchMock.reset();
  });

  it("should return a valid response if the http response is a valid JSON that complies with the given schema, and no transform function is provided", async () => {
    fetchMock.get("http://www.someurl5.com", [
      { username: "juan", email: "cancela.juancarlos@gmail.com" },
    ]);
    const result = await get(
      "http://www.someurl5.com",
      validSchemaNoTransformer
    );
    assert.strictEqual(result[0].username, "juan");
    assert.strictEqual(result[0].email, "cancela.juancarlos@gmail.com");
    fetchMock.reset();
  });

  it("should return a valid response if the http response is a valid JSON that complies with the given schema, and transform its value using the provided transform function", async () => {
    fetchMock.get("http://www.someurl4.com", [{ username: "juan" }]);
    const result = await get("http://www.someurl4.com", validSchema);
    assert.strictEqual(result[0], "juan");
    fetchMock.reset();
  });

  it("should fail if the response is a valid JSON but does not comply with the given schema", async () => {
    fetchMock.get("http://www.someurl3.com", [{ hello: "world" }]);
    try {
      await get("http://www.someurl3.com", validSchema);
    } catch (e) {
      assert.ok(true);
      return;
    }
    assert.fail();
  });

  it("should return a valid response if the http endpoint returns a valid JSON object, and no schema validation is required", async () => {
    fetchMock.get("http://www.someurl.com", { hello: "world" });
    const result = await get("http://www.someurl.com");
    assert.strictEqual(result.hello, "world");
  });

  it("should fail if the response is not a valid JSON object", async () => {
    fetchMock.get("http://www.someurl1.com", "Invalid text");
    try {
      await get("http://www.someurl1.com");
    } catch (e) {
      assert.ok(true);
      return;
    }
    assert.fail();
  });

  it("should fail if the response is null", async () => {
    fetchMock.get("http://www.someurl2.com", null);
    try {
      await get("http://www.someurl2.com");
    } catch (e) {
      assert.ok(true);
      return;
    }
    assert.fail();
  });
});
