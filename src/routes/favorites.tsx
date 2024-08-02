import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import DrinkCard from "../components/DrinkCard"

function Favorites() {

  const favorites = useAppStore(state => state.favorites)
  const hasFavorites = useMemo(() => favorites.length, [favorites])

  return (
    <>
      <h1 className="text-6xl font-black text bg-clip-text text-transparent bg-gradient-to-l from-orange-700 to-orange-400">Favoritos</h1>
      {
        hasFavorites ? (
          <div className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {
              favorites.map(drink => <DrinkCard key={drink.idDrink} drink={drink} />)
            }
          </div>
        ) : (
          <p className="my-10 font-bold text-center text-2xl">Tus favoritos se mostrarán aquí</p>
        )
      }
    </>
  )
}

export default Favorites