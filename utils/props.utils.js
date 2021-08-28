const validUrl = require("valid-url");

const validateProps = () => {
  const { PORT, BASE_URL, HTTP_RETRIES, CACHE_TTL, NETWORKS, CACHE_ENABLED } = process.env;

  const invalidPort = !PORT || isNaN(PORT);
  const invalidBaseUrl = !validUrl.isUri(BASE_URL);
  const invalidHttpRetries = !HTTP_RETRIES || isNaN(HTTP_RETRIES);
  const invalidCacheTTL = !CACHE_TTL || isNaN(CACHE_TTL);
  const invalidNetworks = !NETWORKS;
  const invalidEnableCache = !CACHE_ENABLED || !["yes", "no"].includes(CACHE_ENABLED)

  if (invalidPort || invalidBaseUrl || invalidHttpRetries || invalidCacheTTL || invalidNetworks || invalidEnableCache) {
    throw new Error(
      `Provided properties on .env file on root dir are not valid`
    );
  }
};

const getProps = () => {
  validateProps();
  return {
    port: parseInt(process.env.PORT),
    baseUrl: process.env.BASE_URL,
    httpRetries: parseInt(process.env.HTTP_RETRIES),
    cacheTTL: parseInt(process.env.CACHE_TTL),
    networks: process.env.NETWORKS.split(","),
    cacheEnabled: process.env.CACHE_ENABLED === "yes" ? true : false
  };
};

module.exports = {
  getProps
};
