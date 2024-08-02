import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { createRecipeSlice } from "./recipeSlice"
import type { RecipeSliceType } from "./recipeSlice"
import { createFavoritesSlice } from "./favoritesSlice"
import type { FavoritesSliceType } from "./favoritesSlice"
import { createNotificationSlice } from "./notificationSlice"
import type { NotificationSliceType } from "./notificationSlice"

export const useAppStore = create<RecipeSliceType & FavoritesSliceType & NotificationSliceType>()(
  devtools(
    (...a) => ({
      ...createRecipeSlice(...a),
      ...createFavoritesSlice(...a),
      ...createNotificationSlice(...a)
    })
  )
)