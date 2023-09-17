import httpService from "./http.service";
const productParamEndpoint = "product/";

const productService = {
  fetchAll: async () => {
    const { content } = await httpService.get(productParamEndpoint);
    return content;
  },
};
export default productService;
