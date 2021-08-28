const assert = require("assert");

setValidProcessEnvValues = () => {
  process.env.PORT = "3000";
  process.env.BASE_URL = "http://www.golang.org";
  process.env.HTTP_RETRIES = "5";
  process.env.CACHE_TTL = "100";
};

setInvalidProcessEnvValues = () => {
  process.env.PORT = "notAnInteger";
};

describe("props.utils", () => {
  it("should return all expected properties if they are correctly provided through .env file", () => {
    setValidProcessEnvValues();
    const props = require("../../utils/props.utils").getProps();
    assert.strictEqual(props.port, 3000);
    assert.strictEqual(props.baseUrl, "http://www.golang.org");
    assert.strictEqual(props.cacheTTL, 100);
    assert.strictEqual(props.httpRetries, 5);
  });

  it("should throw an exception if a property provided throgh the .env file is not valid or acceptable", () => {
    try {
      setInvalidProcessEnvValues();
      require("../../utils/props.utils").getProps();
    } catch (e) {
      assert.ok(true);
      return;
    }
    assert.fail();
  });
});
