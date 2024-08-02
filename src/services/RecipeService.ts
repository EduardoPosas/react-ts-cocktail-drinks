import axios from "axios"
import { CategoriesApiSchema, DrinksApiSchema, RecipeDetailsApiSchema } from "../schemas/recipe-schema"
import { SearchFilter, Drink } from "../types"

export async function getCategories() {
  const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"
  // Make api call
  const { data } = await axios.get(url)
  // Validate Response
  const result = CategoriesApiSchema.safeParse(data)
  // Return result
  if (result.success) {
    return result.data
  }
}

export async function getRecipes(filter: SearchFilter) {
  // api url
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter.category}&i=${filter.ingredient}`
  const { data } = await axios.get(url)
  const result = DrinksApiSchema.safeParse(data)
  if (result.success) {
    return result.data
  }
}

export async function getRecipeDetails(id: Drink["idDrink"]) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  const { data } = await axios(url)
  const result = RecipeDetailsApiSchema.safeParse(data.drinks[0])
  if (result.success) {
    return result.data
  }
}