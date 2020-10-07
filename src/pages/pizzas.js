import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzaList';

export default function PizzasPage({data}) {
  // props.data.pizzas
  console.log(data.pizzas);
  const pizzas =data.pizzas.nodes
  return <div> <PizzaList pizzas ={pizzas}/>  </div>;

}


export const query = graphql`
query {
  pizzas: allSanityPizza {
      nodes {
        name
        id 
        slug {
        current
        }

        toppings{
        id 
        name
        }

        image {
          asset{
            fluid(maxWidth: 400){
            ...GatsbySanityImageFluid}
          }
        }
      }
    }
  }
`