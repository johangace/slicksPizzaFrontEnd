import { graphql } from 'gatsby'
import React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'
import SEO from '../components/SEO'
import { Link } from 'gatsby';


const PizzaGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`

export default function SinglePizzaPage({ data: { pizza } }) {
  return (
    <>
      <SEO name={pizza.name} image={pizza?.image?.asset?.fluid?.src}/>
      <PizzaGrid>
        <Link to="/beers">Check Out Our Beers List!!</Link>
      <Img fluid={pizza.image.asset.fluid} />
      <div>
        {' '}
        <h2 className="mark"> {pizza.name} </h2>
        <ul>
          {pizza.toppings.map((topping) => (
            <li key={topping.id}> {topping.name} </li>
          ))}
        </ul>
      </div>
      </PizzaGrid>
      </>
  )
}

//needs to be dynamic vased on the slug passed on gatsby node
export const query = graphql`
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      id
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        name
        id
        vegetarian
      }
    }
  }
`
