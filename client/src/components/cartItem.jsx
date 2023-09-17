/* eslint-disable react/prop-types */

import React from "react";
import Card from "react-bootstrap/Card";
import localStorageService from "../services/localStorage.service";

const CartItem = ({ img, title, price, id, handleClick, handleAdd }) => {
  const accessToken = localStorageService.getAccessToken();
  console.log(id);

  return (
    <Card className="item__card">
      <Card.Img variant="top" className="item__card_img" src={img} />
      <Card.Body>
        <Card.Title className="item__card_title">{title}</Card.Title>
        <Card.Text>Цена: {price}</Card.Text>
        <button className="carts__item-add" onClick={() => handleClick(id)}>
          Go somewhere
        </button>

        {accessToken && (
          <button className="carts__item-add" onClick={() => handleAdd(id)}>
            Add to basket
          </button>
        )}
      </Card.Body>
    </Card>
  );
};

export default CartItem;
