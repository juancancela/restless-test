require("isomorphic-fetch");
const retry = require("async-retry");
const NodeCache = require("node-cache");
const { validate } = require("jsonschema");
const { httpRetries, cacheEnabled, cacheTTL } =
  require("./props.utils").getProps();
const { HttpForbidden, HttpServiceUnavailable } = require("./errors.utils");

const cache = cacheEnabled
  ? new NodeCache({ stdTTL: cacheTTL })
  : { get: () => false, set: () => false };

const UNAUTHORIZED_MSG = "Unauthorized";
const SERVICE_IS_UNAVAILABLE_MSG = "Service is unavailable";

const get = async (url, schema = {}) =>
  cache.get(url)
    ? cache.get(url)
    : await retry(
        async (bail) => {
          const res = await fetch(url);

          if (403 === res.status) {
            bail(new HttpForbidden(UNAUTHORIZED_MSG));
            return;
          }

          const resp = await res.json();

          if (!validate(resp, schema).valid) {
            throw new HttpServiceUnavailable(SERVICE_IS_UNAVAILABLE_MSG);
          }
          
          const value = schema.transform ? schema.transform(resp) : resp;

          cache.set(url, value);
          
          return value;
        },
        {
          retries: httpRetries,
        }
      );

module.exports = {
  get,
};