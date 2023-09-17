import httpService from "./http.service";
const categoryEndpoint = "category/";

const categoryService = {
  get: async () => {
    const { content } = await httpService.get(categoryEndpoint);
    return content;
  },
};
export default categoryService;
