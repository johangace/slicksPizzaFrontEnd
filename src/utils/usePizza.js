import { useState, useContext } from 'react';
import OrderContext from '../components/OrderContext';

export default function usePizza({ pizzas, inputs }) {
  // create state to hold order
  // const [order, setOrder] = useState([])
  // access state and updater(setOrder) via context

  const [order, setOrder] = useContext(OrderContext);
  // add things to order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  // remove from order

  function removeFromOrder(index) {
    setOrder([
      // before remove
      ...order.slice(0, index),

      // after
      ...order.slice(index + 1),
    ]);
  }
  // send to serverless

  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}
