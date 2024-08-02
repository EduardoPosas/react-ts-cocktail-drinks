import { useAppStore } from "../stores/useAppStore"
import { Drink } from "../types"

type DrinkCardProps = {
  drink: Drink
}

function DrinkCard({ drink }: DrinkCardProps) {

  const selectRecipe = useAppStore(state => state.selectRecipe)

  return (
    <div className="shadow rounded">
      <div className="overflow-hidden">
        <img
          src={drink.strDrinkThumb}
          alt={drink.strDrink}
          className="rounded-tl rounded-tr hover:scale-125 hover:rotate-2 transition-transform"
        />
      </div>
      <div className="py-4 px-2">
        <h3 className="truncate text-2xl font-black">{drink.strDrink}</h3>
        <button
          type="button"
          className=" cursor-pointer rounded px-4 py-2 text-white w-full mt-4 bg-orange-700 hover:bg-orange-500 transition-colors font-bold"
          onClick={() => selectRecipe(drink.idDrink)}
        >Ver receta</button>
      </div>
    </div>
  )
}

export default DrinkCard