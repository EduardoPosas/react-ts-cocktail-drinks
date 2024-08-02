import { StateCreator } from "zustand";
import { Categories, Drink, Drinks, RecipeDetails, SearchFilter } from "../types";
import { getCategories, getRecipes, getRecipeDetails } from "../services/RecipeService";

export type RecipeSliceType = {
  categories: Categories
  drinks: Drinks,
  selectedRecipe: RecipeDetails,
  showModal: boolean,
  fetchCategories: () => Promise<void>,
  searchRecipes: (filter: SearchFilter) => Promise<void>,
  selectRecipe: (id: Drink["idDrink"]) => Promise<void>,
  closeModal: () => void
}

/**
 * StateCreator to indicate the type of createRecipeSlice 
 * 
 */
export const createRecipeSlice: StateCreator<RecipeSliceType> = (set) => ({
  categories: {
    drinks: []
  },
  drinks: {
    drinks: []
  },
  selectedRecipe: {} as RecipeDetails,
  showModal: false,
  fetchCategories: async () => {
    const categories = await getCategories()
    set({ categories })
  },
  searchRecipes: async (filter) => {
    const drinks = await getRecipes(filter)
    set({ drinks })
  },
  selectRecipe: async (id) => {
    const selectedRecipe = await getRecipeDetails(id)
    set({
      selectedRecipe,
      showModal: true
    })
  },
  closeModal: () => {
    set({
      showModal: false,
      selectedRecipe: {} as RecipeDetails
    })
  }
})