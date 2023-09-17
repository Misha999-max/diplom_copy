import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import localStorageService from "../../services/localStorage.service";
import { useSelector } from "react-redux";
import { getProducts } from "../../store/product";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const BasketUserPage = () => {
  const [bascket, setBascket] = useState("");
  const products = useSelector(getProducts());
  const history = useHistory();
  const userId = localStorageService.getUserId();
  useEffect(() => {
    if (localStorageService.getBascketId(userId)) {
      setBascket(localStorageService.getBascketId(userId));
    }
  }, []);

  const sliceBasketArr = bascket.split(",");
  let showProductBascketconst = [];
  if (products && bascket) {
    sliceBasketArr.forEach((id) => {
      products.forEach((item) => {
        if (item._id === id) {
          showProductBascketconst.push(item);
        }
      });
    });
  }
  const handleMove = (id) => {
    history.push(`/cartItem/${id}`);
  };
  const handleDelete = (id) => {
    const newArr = localStorage.getItem(userId).split(",");
    const filterArr = newArr.filter((item) => item !== id);
    localStorage.setItem(userId, filterArr);
    setBascket(localStorageService.getBascketId(userId));
  };
  console.log(showProductBascketconst);

  return (
    <div className="user__container">
      <Container>
        <ul className="user__bascket">
          {products && bascket ? (
            showProductBascketconst.map((prod) => (
              <li className="user__bascket-item" key={prod._id}>
                <div
                  className="user__bascket-block"
                  onClick={() => handleMove(prod._id)}
                >
                  <img className="user__bascket-img" src={prod.image} />
                  <span className="user__bascket-title">{prod.title}</span>
                </div>
                <button
                  className="user__bascket-btn"
                  onClick={() => handleDelete(prod._id)}
                >
                  DELETE PRODUCT
                </button>
              </li>
            ))
          ) : (
            <span className="user__bascket-empty">Корзина пока пуста((</span>
          )}
        </ul>
      </Container>
    </div>
  );
};

export default BasketUserPage;
