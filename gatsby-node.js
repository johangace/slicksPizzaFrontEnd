import path from 'path'
// import Pizza from './src/templates/Pizza';


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
	


export async function createPages(params){
	await Promise.all([  turnPizzasIntoPages(params),
		 turnToppingsIntoPages(params)  ])

}