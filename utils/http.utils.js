require("isomorphic-fetch");

const get = async (url) => {
    const res = await fetch(url);
    const resp = res.json();
    return resp;
}

module.exports = {
  get,
};
