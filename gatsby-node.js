import path from 'path'
// import Pizza from './src/templates/Pizza';


async function turnPizzasIntoPages({graphql, actions}){

const pizzaTemplate= path.resolve('.src/templates/Pizza.js')
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
console.log(data)
}
export async function createPages(params){

await turnPizzasIntoPages(params)

}