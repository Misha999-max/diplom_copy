/* eslint-disable react/prop-types */

import React from "react";
import { useSelector } from "react-redux";
import { getCategories, getCategoryStatus } from "../../store/category";

const AsaidBar = ({ handleSortCategory, handleClear }) => {
  const category = useSelector(getCategories());
  const isLoading = useSelector(getCategoryStatus());

  return (
    <div>
      <ul>
        {!isLoading &&
          category.map((item) => (
            <li className="list__category" key={item.category_id}>
              <button
                onClick={() => handleSortCategory(item.category_id)}
                className="btn btn-primary mb-2"
              >
                {item.name}
              </button>
            </li>
          ))}
        <li>
          <button className="btn btn-danger mb-2" onClick={handleClear}>
            All
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AsaidBar;
