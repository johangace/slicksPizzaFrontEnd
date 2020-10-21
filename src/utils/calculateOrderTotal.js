import calculatePizzaPrice from './calculatePizzaPrice';

export default function calculateOrderTotal(order, pizzas) {

  //running total: accumulator  singleOrder : currentValue
  return order.reduce((runningTotal, singleOrder) => {
    const pizza = pizzas.find(
      (singlePizza) => {
        return singlePizza.id === singleOrder.id;
      }
    );
    return runningTotal + calculatePizzaPrice(pizza.price, singleOrder.size);
  }, 0);


}