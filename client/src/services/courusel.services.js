/* eslint-disable react/prop-types */
import httpService from "./http.service";
const couruselEndpoint = "couresel/";

const couruselService = {
  get: async () => {
    const { content } = await httpService.get(couruselEndpoint);
    return content;
  },
};
export default couruselService;
