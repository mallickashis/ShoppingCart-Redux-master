import React, { useState } from "react";
import styles from "./CartItem.module.css";

import { connect } from "react-redux";
import {
  adjustItemQty,
  removeFromCart,
} from "../../../redux/Shopping/shopping-actions";

const CartItem = ({ item, adjustQty, removeFromCart }) => {
  const [input, setInput] = useState(item.qty);

  const onChangeHandler = (e) => {
    setInput(e.target.value);
    adjustQty(item.id, e.target.value);
  };

  return (
    <div className={styles.cartItem}>
      <img
        className={styles.cartItem__image}
        src={item.image}
        alt={item.title}
      />
      <div className={styles.cartItem__details}>
        <p className={styles.details__title}>{item.title}</p>
        <p className={styles.details__desc}>{item.description}</p>
        <p className={styles.details__price}>$ {item.price}</p>
      </div>
      <div className={styles.cartItem__actions}>
        <div className={styles.cartItem__qty}>
          <label htmlFor="qty">Qty</label>
          <input
            min="1"
            type="number"
            id="qty"
            name="qty"
            value={input}
            onChange={onChangeHandler}
          />
        </div>
        <button
          onClick={() => removeFromCart(item.id)}
          className={styles.actions__deleteItemBtn}
        >
          <img
            src="data:image/png;base64,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"
            alt=""
          />
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    adjustQty: (id, value) => dispatch(adjustItemQty(id, value)),
    removeFromCart: (id) => dispatch(removeFromCart(id)),
  };
};

export default connect(null, mapDispatchToProps)(CartItem);
