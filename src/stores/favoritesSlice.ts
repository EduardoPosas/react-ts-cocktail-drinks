import { StateCreator } from "zustand"
import { createRecipeSlice, RecipeSliceType } from "./recipeSlice"
import { RecipeDetails } from "../types"
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice"

export type FavoritesSliceType = {
  favorites: RecipeDetails[]
  handleFavorites: (recipe: RecipeDetails) => void
  favoriteExist: (id: RecipeDetails["idDrink"]) => boolean,
  fetchFavoritesFromLocalStorage: () => void
}

// Configuration to share data between slices, this case from createRecipe to createFavorites
export const createFavoritesSlice: StateCreator<FavoritesSliceType & RecipeSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
  favorites: [],
  handleFavorites: (recipe) => {
    // One way to access actual state
    if (get().favoriteExist(recipe.idDrink)) {
      set((state) => ({
        favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
      }))
      createNotificationSlice(set, get, api).showNotification({ text: "Bebida eliminada de favoritos", error: true })
    } else {
      // set((state) => ({
      //   favorites: [...state.favorites, recipe]
      // }))
      // Other way to set state with getter
      set({
        favorites: [...get().favorites, recipe]
      })
      createNotificationSlice(set, get, api).showNotification({ text: "Bebida agragada a favoritos", error: false })
    }
    createRecipeSlice(set, get, api).closeModal()
    // Add to local storage
    localStorage.setItem("favorites", JSON.stringify(get().favorites))
  },
  favoriteExist: (id) => {
    return get().favorites.some(favorite => favorite.idDrink === id)
  },
  fetchFavoritesFromLocalStorage: () => {
    const fetchedFavorites = localStorage.getItem("favorites")
    if (fetchedFavorites) {
      set({
        favorites: JSON.parse(fetchedFavorites)
      })
    }
  }
})