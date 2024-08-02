import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import DrinkCard from "../components/DrinkCard"

function Index() {

  const drinks = useAppStore((state) => state.drinks)
  const hasDrinks = useMemo(() => drinks?.drinks.length, [drinks])

  return (
    <>
      <h1 className="text-6xl font-black text bg-clip-text text-transparent bg-gradient-to-l from-orange-700 to-orange-400">Recetas</h1>
      {
        hasDrinks ? (
          <div className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {
              drinks.drinks.map(drink => <DrinkCard key={drink.idDrink} drink={drink} />)
            }
          </div>
        ) : (
          <p className="my-10 font-bold text-center text-2xl">No hay recetas, Ingresa los filtros en el formulario de búsqueda</p>
        )
      }
    </>
  )
}

export default Index