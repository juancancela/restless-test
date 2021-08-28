const getProps = () => {
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