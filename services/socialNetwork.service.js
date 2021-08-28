const service = module.exports;

const { get } = require("../utils/http.utils");
const schemas = require("./socialNetwork.service.schemas");
const { baseUrl, networks } = require("../utils/props.utils").getProps();

const { assign } = Object;
const { log } = console;

service.get = async () =>
  await (
    await Promise.all(
      networks.map(async (network) => {
        log(`[socialNetwork.service]::getting results for network ${network}`);
        const url = `${baseUrl}/${network}`;
        const response = await get(url, schemas[network]);
        log(`[socialNetwork.service]::response for network ${network}: ${response}`);
        return response;
      })
    )
  ).reduce((r, c) => assign(r, c), {});
