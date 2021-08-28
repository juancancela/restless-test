const getProps = () => {
  return {
    port: parseInt(process.env.PORT),
  };
};

module.exports = {
  getProps,
};
