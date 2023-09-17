import categoryService from "../../services/category.service";
import { isDate } from "../../utils/date";
import {
  categoryRequeted,
  categoryReceved,
  categoryRequestFild,
} from "./catrgory.slice";

export const loadCategoryList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().category;
  if (isDate(lastFetch)) {
    dispatch(categoryRequeted);
    try {
      const { list } = await categoryService.get();

      dispatch(categoryReceved(list));
    } catch (error) {
      dispatch(categoryRequestFild(error.message));
    }
  }
};
