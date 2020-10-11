import path from 'path'
// import Pizza from './src/templates/Pizza';
import fetch from 'isomorphic-fetch'

async function fetchBeersAndTurnIntoNodes({actions, createNodeId, createContentDigest}){
	const res = await fetch('https://sampleapis.com/beers/api/ale');
	const beers = await res.json()
for (const beer of beers){
	const nodeMeta= { 
		id: createNodeId(`beer-${beer.name}`),
		parent: null,
		children: [],
		internal: {
		type: 'Beer',
		mediaType: 'application/json',
		contentDigest: createContentDigest(beer),
   	}
	}
	actions.createNode({
		...beer,
		...nodeMeta,
	})
}}

export async function sourceNodes(params){
	await Promise.all([fetchBeersAndTurnIntoNodes(params)])
}

async function turnPizzasIntoPages({graphql, actions}){
const pizzaTemplate= path.resolve('./src/templates/Pizza.js')
const {data} = await graphql(`
	query {
		pizzas: allSanityPizza {
			nodes {
				name 
				slug {
					current
					}
				}
			}
		}
`)
// console.log(data)
data.pizzas.nodes.forEach((pizza)=> {
	actions.createPage({
		path: `pizza/${pizza.slug.current}`,
		component: pizzaTemplate,

			context: {
        slug: pizza.slug.current,
  
		}
	})
})}



async function turnToppingsIntoPages({graphql, actions}){

	const toppingTemplate= path.resolve('./src/pages/pizzas.js')
	const {data} = await graphql(`
		query {
			toppings: allSanityTopping {
				nodes {
					name 
					id
					}
				}
			}
	`)
	//  console.log(data)
	data.toppings.nodes.forEach((topping)=> {
		actions.createPage({
			path: `topping/${topping.name}`,
			component: toppingTemplate,
				context: {
					id: topping.name,
					toppingRegex: `/${topping.name}/i`
			}
		})
	})}
	


async function turnSlicemastersIntoPages({graphql, actions}) {
			const {data} = await graphql(`
		query {
			slicemasters: allSanityPerson {
				totalCount
				nodes {
					name 
					id
					slug {
						current
					}
					}
				}
			}

		
	`)
	const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE)
	const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize)

	console.log(pageSize + 'asfhs'+  pageCount);
	}


export async function createPages(params){
	await Promise.all([  turnPizzasIntoPages(params),
		 turnToppingsIntoPages(params)  ])
}