const getProps = () => {
  return {
    port: parseInt(process.env.PORT),
    baseUrl: process.env.BASE_URL
  };
};

module.exports = {
  getProps,
};
