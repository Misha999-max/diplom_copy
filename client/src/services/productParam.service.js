import httpService from "./http.service";
const productParamEndpoint = "productParam/";

const productParamService = {
  fetchAll: async () => {
    const { data } = await httpService.get(productParamEndpoint);
    return data;
  },
};
export default productParamService;
