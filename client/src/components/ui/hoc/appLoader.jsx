/* eslint-disable react/prop-types */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryStatus, loadCategoryList } from "../../../store/category";
import { getProductsStatus, loadProductsList } from "../../../store/product";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const productsLoading = useSelector(getProductsStatus());
  const categoryLoading = useSelector(getCategoryStatus());
  useEffect(() => {
    dispatch(loadProductsList());
    dispatch(loadCategoryList());
  }, []);

  if (productsLoading && categoryLoading) return "loading";
  return children;
};

export default AppLoader;
