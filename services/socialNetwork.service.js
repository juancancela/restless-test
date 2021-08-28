const service = module.exports;

const { get } = require("../utils/http.utils");
const { baseUrl } = require("../utils/props.utils").getProps();

service.get = async () => {
    return await get(`${baseUrl}/twitter`);
}