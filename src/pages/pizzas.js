import { graphql } from 'gatsby'
import React from 'react'
import PizzaList from '../components/PizzaList'
import ToppingsFilter from '../components/ToppingsFilter'
import SEO from '../components/SEO'
import { Link } from 'gatsby'

export default function PizzasPage({ data, pageContext }) {
  const pizzas = data.pizzas.nodes
  return (
    <div>
      <SEO
        title={
          pageContext.topping
            ? `Pizzas With ${pageContext.topping}`
            : `All Pizzas`
        }
      ></SEO>
      <Link to="/beers">
        {' '}
        <h4> Check Out Our Beers List!! </h4>
      </Link>
      <ToppingsFilter activeTopping={pageContext.topping} />
      <PizzaList pizzas={pizzas} />{' '}
    </div>
  )
}

export const query = graphql`
  query PizzaQuery($toppingRegex: String) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { regex: $toppingRegex } } } }
    ) {
      nodes {
        name
        id
        slug {
          current
        }

        toppings {
          id
          name
        }

        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`
